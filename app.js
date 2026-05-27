/**
 * InsightED URS Explorer - Live Data Sync & Interactivity Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- Configuration ---
  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1HZqDgvoVPjf7qCjIgKpdSszOmqw_H0OhLmEJFE7yGCY/export?format=csv&resourcekey=&gid=1430583728";

  // --- State Variables ---
  let selectedProjectId = null;
  let activeCategory = "overview";
  let sidebarSearchQuery = "";
  let reqSearchQuery = "";

  // --- DOM Elements ---
  const projectSearchInput = document.getElementById("projectSearch");
  const projectListContainer = document.getElementById("projectList");
  const emptyStateSection = document.getElementById("emptyState");
  const activeWorkspaceSection = document.getElementById("activeWorkspace");
  
  const workspaceTitle = document.getElementById("workspaceTitle");
  const workspacePurpose = document.getElementById("workspacePurpose");
  const workspaceSubmitter = document.getElementById("workspaceSubmitter");
  
  const tabNav = document.getElementById("tabNav");
  const requirementSearchInput = document.getElementById("requirementSearch");
  const requirementsGrid = document.getElementById("requirementsGrid");
  const btnPrint = document.getElementById("btnPrint");
  const syncStatus = document.getElementById("syncStatus");
  const logoBrand = document.getElementById("logoBrand");

  // --- Category Icons Mapping ---
  const iconMapping = {
    // Overview
    specific_problem: "fa-solid fa-circle-exclamation",
    success_kpis: "fa-solid fa-chart-line",
    timeline_milestones: "fa-solid fa-calendar-days",
    mvr_features: "fa-solid fa-rocket",
    deferred_features: "fa-solid fa-hourglass-half",
    must_vs_nice_have: "fa-solid fa-star",

    // Users
    user_groups: "fa-solid fa-users",
    primary_vs_secondary: "fa-solid fa-people-arrows",
    external_users: "fa-solid fa-globe",
    current_process: "fa-solid fa-arrows-spin",
    current_tools: "fa-solid fa-laptop-code",
    ideal_process: "fa-solid fa-wand-magic-sparkles",

    // Pain Points
    biggest_pain_points: "fa-solid fa-bolt-lightning",
    workarounds: "fa-solid fa-screwdriver-wrench",
    policy_constraints: "fa-solid fa-shield-halved",

    // Capabilities
    critical_functions: "fa-solid fa-circle-check",
    supported_decisions: "fa-solid fa-gavel",
    action_triggers: "fa-solid fa-bell",
    crud_info: "fa-solid fa-database",
    approvals_rules: "fa-solid fa-key",
    exceptions_edge_cases: "fa-solid fa-triangle-exclamation",
    reports_dashboards: "fa-solid fa-chart-pie",

    // Data
    core_data_entities: "fa-solid fa-table-list",
    mandatory_optional: "fa-solid fa-asterisk",
    data_quality_rules: "fa-solid fa-vial-circle-check",
    data_migration: "fa-solid fa-file-import",
    role_based_access: "fa-solid fa-user-lock",
    identifiers_cross_system: "fa-solid fa-barcode"
  };

  // --- Helper Function: Rich Formatting for Answers ---
  function formatValue(text) {
    if (!text) return `<span class="text-muted">No details provided.</span>`;
    
    // Check if the text represents a numbered list (e.g. "1. Item\n2. Item")
    const lines = text.split("\n");
    if (lines.length > 1) {
      const formattedLines = lines.map(line => {
        const trimmed = line.trim();
        // Remove standard numbering or bullets for customized rendering
        const cleanLine = trimmed.replace(/^(\d+\.\s*|-\s*|\*\s*)/, "");
        if (cleanLine) {
          return `<li>${cleanLine}</li>`;
        }
        return "";
      }).filter(Boolean);

      if (formattedLines.length > 0) {
        return `<ul>${formattedLines.join("")}</ul>`;
      }
    }

    return text;
  }

  // --- Robust State-Machine CSV Parser ---
  function parseCSV(text) {
    const result = [];
    let row = [];
    let field = '';
    let inQuotes = false;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          field += '"';
          i++; // skip next escaped quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(field);
        field = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        row.push(field);
        result.push(row);
        row = [];
        field = '';
      } else {
        field += char;
      }
    }
    if (field || row.length > 0) {
      row.push(field);
      result.push(row);
    }
    return result;
  }

  // --- Convert Parsed CSV rows to Project JSON Format ---
  function mapCSVToProjects(csvRows) {
    // Row 0 is the headers, entries start from Row 1
    const mapped = [];
    
    for (let i = 1; i < csvRows.length; i++) {
      const row = csvRows[i];
      // Skip empty or corrupted rows (C is title column at index 2)
      if (!row || row.length < 4 || !row[2]) continue;

      const title = row[2].trim();
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      mapped.push({
        id: id,
        title: title,
        submitter: row[1] ? row[1].trim() : "Unknown Submitter",
        purpose: row[3] ? row[3].trim() : "No purpose provided.",
        categories: {
          overview: [
            { key: "specific_problem", label: "What specific problem are you solving and why?", value: row[4] },
            { key: "success_kpis", label: "What outcomes must be true for success (measurable KPIs)?", value: row[5] },
            { key: "timeline_milestones", label: "Expected timeline, critical milestones, and hard deadlines", value: row[6] },
            { key: "mvr_features", label: "If we can only deliver a minimum viable release, what is most necessary?", value: row[29] },
            { key: "deferred_features", label: "What can be deferred safely to later phases?", value: row[30] },
            { key: "must_vs_nice_have", label: "What features are \"nice-to-have\" vs \"must-have,\" and why?", value: row[31] }
          ],
          users: [
            { key: "user_groups", label: "Who are the user groups? Please describe each role’s responsibilities.", value: row[7] },
            { key: "primary_vs_secondary", label: "Which users are primary (input providers) vs secondary (monitoring)?", value: row[8] },
            { key: "external_users", label: "Are there external users who will access the system?", value: row[9] },
            { key: "current_process", label: "Walk me through the current end-to-end process step by step.", value: row[10] },
            { key: "current_tools", label: "What tools/systems are used today, and where does data originate?", value: row[11] },
            { key: "ideal_process", label: "Describe the ideal process flow for this project", value: row[15] }
          ],
          painPoints: [
            { key: "biggest_pain_points", label: "What are the biggest pain points, bottlenecks, or error-prone steps?", value: row[12] },
            { key: "workarounds", label: "What workarounds do users rely on today?", value: row[13] },
            { key: "policy_constraints", label: "What must remain unchanged due to policy, regulation, or operational reality?", value: row[14] }
          ],
          systemCapabilities: [
            { key: "critical_functions", label: "What user functions do you deem most critical?", value: row[16] },
            { key: "supported_decisions", label: "What decisions must the system support (approvals, checks, validations)?", value: row[17] },
            { key: "action_triggers", label: "What events should trigger actions (time-based, status change, etc.)?", value: row[18] },
            { key: "crud_info", label: "What information must users be able to create, view, update, delete, search, export?", value: row[19] },
            { key: "approvals_rules", label: "What approvals exist today, and what approval rules must the system enforce?", value: row[20] },
            { key: "exceptions_edge_cases", label: "What exceptions/edge cases occur frequently, and how should they be handled?", value: row[21] },
            { key: "reports_dashboards", label: "What reports/dashboards are required, and what questions should they answer?", value: row[22] }
          ],
          dataValidation: [
            { key: "core_data_entities", label: "What are the core data entities and their key fields?", value: row[23] },
            { key: "mandatory_optional", label: "What data is mandatory vs optional at each step?", value: row[24] },
            { key: "data_quality_rules", label: "What data quality rules must be enforced?", value: row[25] },
            { key: "data_migration", label: "What historical data must be migrated, and how far back?", value: row[26] },
            { key: "role_based_access", label: "Who can see or edit which data (role-based access expectations)?", value: row[27] },
            { key: "identifiers_cross_system", label: "What identifiers must match across systems (IPC, project ID, school ID)?", value: row[28] }
          ]
        }
      });
    }

    return mapped;
  }

  // --- Fetch Live Spreadsheet Data with Offline Fallback ---
  async function syncLiveData() {
    // Show active syncing status
    syncStatus.className = "sync-status";
    syncStatus.innerHTML = `<i class="fa-solid fa-arrows-rotate fa-spin"></i>`;
    syncStatus.title = "Syncing live with Google Sheet...";

    try {
       const response = await fetch(SHEET_CSV_URL);
      if (!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`);
      }
      
      const csvText = await response.text();
      const parsedRows = parseCSV(csvText);
      const liveProjects = mapCSVToProjects(parsedRows);

      if (liveProjects.length > 0) {
        window.projectsData = liveProjects;
        
        // Show success status
        syncStatus.className = "sync-status success";
        syncStatus.innerHTML = `<i class="fa-solid fa-cloud-arrow-up" style="color: var(--color-emerald);"></i>`;
        syncStatus.title = "Synced live with Google Sheet!";
        
        // Update welcome panel indicators
        updateWelcomeStats(liveProjects.length);
      } else {
        throw new Error("No valid project rows parsed from spreadsheet.");
      }
    } catch (error) {
      console.warn("Live spreadsheet sync failed, loading fallback data. Error details: ", error);
      
      // Update sync status indicator to show fallback/offline status
      syncStatus.className = "sync-status error";
      syncStatus.innerHTML = `<i class="fa-solid fa-cloud-arrow-down" style="color: var(--color-amber);"></i>`;
      syncStatus.title = "Sync failed. Loaded fallback offline data.";
      
      // Ensure we keep preloaded local fallback data loaded
      if (window.projectsData && window.projectsData.length > 0) {
        updateWelcomeStats(window.projectsData.length);
      }
    }

    // Refresh rendering with loaded data
    renderSidebar();
  }

  // --- Update Dashboard Empty View Stats ---
  function updateWelcomeStats(projectCount) {
    const statsVals = document.querySelectorAll(".info-stat-val");
    if (statsVals.length > 0) {
      statsVals.forEach(val => {
        val.textContent = projectCount;
      });
    }
  }

  // --- Render Sidebar Project Cards ---
  function renderSidebar() {
    projectListContainer.innerHTML = "";
    
    if (!window.projectsData || window.projectsData.length === 0) {
      projectListContainer.innerHTML = `
        <div class="text-muted" style="padding: 12px 8px; font-size: 0.85rem; text-align: center;">
          No specifications loaded.
        </div>
      `;
      return;
    }

    const filteredProjects = window.projectsData.filter(project => {
      const matchTitle = project.title.toLowerCase().includes(sidebarSearchQuery.toLowerCase());
      const matchPurpose = project.purpose.toLowerCase().includes(sidebarSearchQuery.toLowerCase());
      const matchEmail = project.submitter.toLowerCase().includes(sidebarSearchQuery.toLowerCase());
      return matchTitle || matchPurpose || matchEmail;
    });

    if (filteredProjects.length === 0) {
      projectListContainer.innerHTML = `
        <div class="text-muted" style="padding: 12px 8px; font-size: 0.85rem; text-align: center;">
          No matching URS found.
        </div>
      `;
      return;
    }

    filteredProjects.forEach(project => {
      const card = document.createElement("div");
      card.className = `project-card ${project.id === selectedProjectId ? "active" : ""}`;
      card.innerHTML = `
        <h4 class="project-card-title">${project.title}</h4>
        <div class="project-card-meta">
          <i class="fa-solid fa-envelope"></i>
          <span>${project.submitter}</span>
        </div>
      `;
      
      card.addEventListener("click", () => {
        selectProject(project.id);
      });
 
      projectListContainer.appendChild(card);
    });
  }

  // --- Project Selection Handler ---
  function selectProject(id) {
    selectedProjectId = id;
    renderSidebar(); // Update selected card styling

    const project = window.projectsData.find(p => p.id === id);
    if (!project) return;

    // Transition panels
    emptyStateSection.style.display = "none";
    activeWorkspaceSection.style.display = "flex";

    // Populate header details
    workspaceTitle.textContent = project.title;
    workspacePurpose.textContent = project.purpose;
    workspaceSubmitter.textContent = project.submitter;

    // Reset searching and tab to Overview
    reqSearchQuery = "";
    requirementSearchInput.value = "";
    
    // Default to 'overview' tab on new project selection
    switchTab("overview");
  }

  // --- Tab Switcher Handler ---
  function switchTab(category) {
    activeCategory = category;
    
    // Update navigation styles
    const tabButtons = tabNav.querySelectorAll(".tab-btn");
    tabButtons.forEach(btn => {
      if (btn.getAttribute("data-category") === category) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    renderRequirements();
  }

  // --- Render Requirement Cards Grid ---
  function renderRequirements() {
    requirementsGrid.innerHTML = "";
    
    const project = window.projectsData.find(p => p.id === selectedProjectId);
    if (!project) return;

    const currentTabFields = project.categories[activeCategory] || [];
    
    // Filter fields based on search keyword
    const filteredFields = currentTabFields.filter(field => {
      const matchLabel = field.label.toLowerCase().includes(reqSearchQuery.toLowerCase());
      const matchValue = field.value.toLowerCase().includes(reqSearchQuery.toLowerCase());
      return matchLabel || matchValue;
    });

    // Handle full-width or single-column layout for long processes
    const isFullWidthCategory = activeCategory === "users" || activeCategory === "systemCapabilities";
    if (isFullWidthCategory) {
      requirementsGrid.classList.add("full-width");
    } else {
      requirementsGrid.classList.remove("full-width");
    }

    if (filteredFields.length === 0) {
      requirementsGrid.innerHTML = `
        <div class="no-results-card">
          <i class="fa-solid fa-filter-circle-xmark"></i>
          <div>No matching requirements found in this tab.</div>
        </div>
      `;
      return;
    }

    filteredFields.forEach(field => {
      const card = document.createElement("div");
      card.className = `req-card cat-${activeCategory}`;
      
      const iconClass = iconMapping[field.key] || "fa-solid fa-circle-info";
      
      card.innerHTML = `
        <div class="req-header">
          <div class="req-icon-box">
            <i class="${iconClass}"></i>
          </div>
          <h4 class="req-label">${field.label}</h4>
        </div>
        <div class="req-value">${formatValue(field.value)}</div>
      `;

      requirementsGrid.appendChild(card);
    });
  }

  // --- Event Listeners ---

  // Sidebar search input event listener
  projectSearchInput.addEventListener("input", (e) => {
    sidebarSearchQuery = e.target.value;
    renderSidebar();
  });

  // Local requirement tab filtering
  requirementSearchInput.addEventListener("input", (e) => {
    reqSearchQuery = e.target.value;
    renderRequirements();
  });

  // Tab click listeners
  tabNav.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    
    const category = btn.getAttribute("data-category");
    switchTab(category);
  });

  // Print button listener
  btnPrint.addEventListener("click", () => {
    const project = window.projectsData.find(p => p.id === selectedProjectId);
    if (!project) return;

    const printContainer = document.getElementById("printContainer");
    if (!printContainer) return;

    // Define friendly category labels
    const catLabels = {
      overview: "Overview & Goals",
      users: "Users & Process",
      painPoints: "Pain Points",
      systemCapabilities: "System Capabilities",
      dataValidation: "Data & Quality Validation"
    };

    let html = `
      <div class="print-header">
        <h1 class="print-title">${project.title}</h1>
        <div class="print-meta">
          <strong>Submitted by:</strong> ${project.submitter}
        </div>
        <div class="print-purpose">
          <strong>Purpose & Scope of the Project:</strong><br>
          ${project.purpose}
        </div>
      </div>
    `;

    // Loop through all categories
    for (const [catKey, fields] of Object.entries(project.categories)) {
      if (!fields || fields.length === 0) continue;
      
      html += `
        <div class="print-section">
          <h2 class="print-section-title">${catLabels[catKey] || catKey}</h2>
          <div class="print-grid">
      `;

      fields.forEach(field => {
        const iconClass = iconMapping[field.key] || "fa-solid fa-circle-info";
        html += `
          <div class="print-card">
            <div class="print-card-header">
              <i class="${iconClass} print-card-icon"></i>
              <span>${field.label}</span>
            </div>
            <div class="print-card-value">${formatValue(field.value)}</div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    }

    printContainer.innerHTML = html;
    window.print();
  });

  // Reset to Landing Page when clicking logo brand
  logoBrand.addEventListener("click", () => {
    selectedProjectId = null;
    renderSidebar(); // Rerender so no card is highlighted active
    activeWorkspaceSection.style.display = "none";
    emptyStateSection.style.display = "flex";
  });

  // --- Initial Launch Setup ---
  syncLiveData();
});
