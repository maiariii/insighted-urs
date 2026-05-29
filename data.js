window.projectsData = [
  {
    id: "nosca-tracker",
    title: "NOSCA ISSUANCE TRACKER",
    submitter: "noverose.dadole@deped.gov.ph",
    timestamp: "2026-05-28 14:32:10",
    purpose: "CO monitoring of the NOSCA issuance of DBM to DepEd field offices and IUs",
    categories: {
      overview: [
        {
          key: "specific_problem",
          label: "What specific problem are you solving and why?",
          value: "efficient monitoring of the program team (e.g lessens manual verification"
        },
        {
          key: "success_kpis",
          label: "What outcomes must be true for success (measurable KPIs)?",
          value: "100% accuracy rate on item numbers and on the number of items by position/level of education/SDO and by school for JHS with issued NOSCA vs approved allocation"
        },
        {
          key: "timeline_milestones",
          label: "Expected timeline, critical milestones, and hard deadlines",
          value: "For deployment before June 2026. Uploading by the field is June-July"
        },
        {
          key: "mvr_features",
          label: "If we can only deliver a minimum viable release, what is most necessary?",
          value: "All are necessary"
        },
        {
          key: "deferred_features",
          label: "What can be deferred safely to later phases?",
          value: "None"
        },
        {
          key: "must_vs_nice_have",
          label: "What features are \"nice-to-have\" vs \"must-have,\" and why?",
          value: "All are must-haves based on our meetings and discussions"
        }
      ],
      users: [
        {
          key: "user_groups",
          label: "Who are the user groups? Please describe each role’s responsibilities.",
          value: "HRMOs to upload the NOSCA and verify the counts and item numbers"
        },
        {
          key: "primary_vs_secondary",
          label: "Which users are primary (input providers) vs secondary (monitoring)?",
          value: "Primary - SDO HRMOs; Secondary - Regional HRMOs, BHROD-SED and USec of HROD"
        },
        {
          key: "external_users",
          label: "Are there external users who will access the system?",
          value: "None so far"
        },
        {
          key: "current_process",
          label: "Walk me through the current end-to-end process step by step.",
          value: "DBM issues the NOSCA to the Regions, SDOs, and IUs through its system. SDO HRMOs shall download the NOSCA from the system and submit the downloaded copy to BHROD-SED through the designated Google Form.\n\nIf discrepancies are identified by BHROD-SED during the review of the submitted NOSCA, the concerned HRMOs shall recheck the submitted NOSCA and comply with the noted discrepancies accordingly."
        },
        {
          key: "current_tools",
          label: "What tools/systems are used today, and where does data originate?",
          value: "Submission of the NOSCA was done through Google Forms. SED monitoring and verification were conducted through an Excel-based tool."
        },
        {
          key: "ideal_process",
          label: "Describe the ideal process flow for this project",
          value: "SDO HRMO to upload and verify the numbers including the item number; RO HRMOs and SED to monitor submission and flag inconsistencies found, if applicable"
        }
      ],
      painPoints: [
        {
          key: "biggest_pain_points",
          label: "What are the biggest pain points, bottlenecks, or error-prone steps?",
          value: "Manual verification of BHROD-SED on the number of items"
        },
        {
          key: "workarounds",
          label: "What workarounds do users rely on today?",
          value: "Manual and careful verification of the accuracy of items, particularly the number of items and school names, for JHS."
        },
        {
          key: "policy_constraints",
          label: "What must remain unchanged due to policy, regulation, or operational reality?",
          value: "100% accuracy rate of the number of items approved for creation vs the issued NOSCA"
        }
      ],
      systemCapabilities: [
        {
          key: "critical_functions",
          label: "What user functions do you deem most critical?",
          value: "uploading and verification of SDO HRMOs"
        },
        {
          key: "supported_decisions",
          label: "What decisions must the system support (approvals, checks, validations)?",
          value: "uploading and verification of SDO HRMOs"
        },
        {
          key: "action_triggers",
          label: "What events should trigger actions (time-based, status change, etc.)?",
          value: "disrepancies of the number of items by position/level of education"
        },
        {
          key: "crud_info",
          label: "What information must users be able to create, view, update, delete, search, export?",
          value: "item numbers, school name for JHS and number of items byu position/level of education"
        },
        {
          key: "approvals_rules",
          label: "What approvals exist today, and what approval rules must the system enforce?",
          value: "Approval for mismatch school name for JHS, if necessary"
        },
        {
          key: "exceptions_edge_cases",
          label: "What exceptions/edge cases occur frequently, and how should they be handled?",
          value: "Uploading of more than one PDF copy of the NOSCA due to the batch issuance by DBM"
        },
        {
          key: "reports_dashboards",
          label: "What reports/dashboards are required, and what questions should they answer?",
          value: "Regional and Division summary of issued NOSCAs (% of issued NOSCAs without errors over the total allocation). Breakdown by position and level of education"
        }
      ],
      dataValidation: [
        {
          key: "core_data_entities",
          label: "What are the core data entities and their key fields?",
          value: "Item numbers, number of items based on the issued NOSCA by pooasition and level of education, school name for JHS"
        },
        {
          key: "mandatory_optional",
          label: "What data is mandatory vs optional at each step?",
          value: "All are mandatory"
        },
        {
          key: "data_quality_rules",
          label: "What data quality rules must be enforced?",
          value: "Should accept PDF format"
        },
        {
          key: "data_migration",
          label: "What historical data must be migrated, and how far back?",
          value: "NOSCA for this FY only"
        },
        {
          key: "role_based_access",
          label: "Who can see or edit which data (role-based access expectations)?",
          value: "BHROD-SED"
        },
        {
          key: "identifiers_cross_system",
          label: "What identifiers must match across systems (IPC, project ID, school ID)?",
          value: "Item numbers to be used for the Phase 2 monitoring for the deployment of items"
        }
      ]
    }
  },
  {
    id: "siif-monitoring",
    title: "School Innovation and Improvement Fund (SIIF) Online Monitoring through InsightED",
    submitter: "melanie.villareal@deped.gov.ph",
    timestamp: "2026-05-27 09:15:44",
    purpose: "To efficiently document approved school‑level interventions, track physical and financial implementation, and generate evidence to support continuous improvement.",
    categories: {
      overview: [
        {
          key: "specific_problem",
          label: "What specific problem are you solving and why?",
          value: "Limitations of using Google Form as a mecahnism to monitor the physical and finnacial performance of the SIIF. (Traditional approach to input form development, management, and trouble-shooting.)"
        },
        {
          key: "success_kpis",
          label: "What outcomes must be true for success (measurable KPIs)?",
          value: "1. Efficient documentation of approved school‑level interventions \n2. Efficient tracking of physical and financial performance \n3. Efficient generation of evidence to support continuous improvement"
        },
        {
          key: "timeline_milestones",
          label: "Expected timeline, critical milestones, and hard deadlines",
          value: "Expected timeline: End of May 2026 \n\nCritical Milestones:\n1. Development of bottom bars (Home, Forms, Utilization, and Setting) \n2. Development of RO/SDO Dashboard \n3. Pilot testing of SIIF Hub and RO/SDO Dashboard \n\nDeadlines:\nStart of actual implemntation (July 2026) \nEnd of implementation (June 2027)"
        },
        {
          key: "mvr_features",
          label: "If we can only deliver a minimum viable release, what is most necessary?",
          value: "School level data inputting is non-negotiable."
        },
        {
          key: "deferred_features",
          label: "What can be deferred safely to later phases?",
          value: "None."
        },
        {
          key: "must_vs_nice_have",
          label: "What features are \"nice-to-have\" vs \"must-have,\" and why?",
          value: "nice-to-have: Option to print and export the data summary. \nmust-have: Summary of core data entities."
        }
      ],
      users: [
        {
          key: "user_groups",
          label: "Who are the user groups? Please describe each role’s responsibilities.",
          value: "1. School Head - Input the identified school-level interventions and submit quarterly physical and financial reports.\n2. SDO (SBM focal) - Review and monitor the overall progress and completion rate of school-level implementation based on physical and financial reports submitted by recipient schools.\n3. RO (SBM focal) - Conduct regular monitoring of SIIF completion rates across SDOs within the assigned jurisdiction."
        },
        {
          key: "primary_vs_secondary",
          label: "Which users are primary (input providers) vs secondary (monitoring)?",
          value: "Primary: School Heads \nSecondary: RO and SDO SBM focals"
        },
        {
          key: "external_users",
          label: "Are there external users who will access the system?",
          value: "None"
        },
        {
          key: "current_process",
          label: "Walk me through the current end-to-end process step by step.",
          value: "1. Schools revisit current AIP\n2. Schools accomplish SIIF Online Form\n3. SDOs review inputs from schools thhrough SIIF Online Validation and Monitoring Tools \n4. Schools implement interventions \n5. Schools periodically update their SIIF utilization through SIIF Online Form \n6. SDO/RO provide technical assistance and conduct regular monitoring"
        },
        {
          key: "current_tools",
          label: "What tools/systems are used today, and where does data originate?",
          value: "Data originates from the school level and inputted via Google Form. Progress monitoring and provision of technical assistance is managed through Google Sheets."
        },
        {
          key: "ideal_process",
          label: "Describe the ideal process flow for this project",
          value: "Automated process flow across governance levels"
        }
      ],
      painPoints: [
        {
          key: "biggest_pain_points",
          label: "What are the biggest pain points, bottlenecks, or error-prone steps?",
          value: "1. Multiple submissions (no overwrite capabilities) \n2. Late updating of SIIF utilization \n3. Inputting error vulnerability (excess amount of SIIF vs actual SIIF allocation, planned school interventions)"
        },
        {
          key: "workarounds",
          label: "What workarounds do users rely on today?",
          value: "Manual troubleshooting"
        },
        {
          key: "policy_constraints",
          label: "What must remain unchanged due to policy, regulation, or operational reality?",
          value: "General Process Flow and Implementation arrangements across governance levels"
        }
      ],
      systemCapabilities: [
        {
          key: "critical_functions",
          label: "What user functions do you deem most critical?",
          value: "Data visualization \nsimplicity and Ease of Use \nFaster Interaction \nConsistency of Results \nReduced Error"
        },
        {
          key: "supported_decisions",
          label: "What decisions must the system support (approvals, checks, validations)?",
          value: "Planned interventions - School Head\nReview of planned interventions and school completion rate - SDO SBM Focal \nSDO completion rate - RO SBM Focal \nOverall physical and financial performance - CO"
        },
        {
          key: "action_triggers",
          label: "What events should trigger actions (time-based, status change, etc.)?",
          value: "Request for inclusion of SIIF in InsightED which shall improve observance of timelines and deadlines."
        },
        {
          key: "crud_info",
          label: "What information must users be able to create, view, update, delete, search, export?",
          value: "School Head:\n1. View the summary of interventions, beneficiaries, activities, budget estimates and utilization\n2. Update the SIIF utilization\n\nSDO SBM focal:\n1. View the interventions and SIIF utilization of schools.\n\nRO SBM focal:\n1. View the SDO submission rates."
        },
        {
          key: "approvals_rules",
          label: "What approvals exist today, and what approval rules must the system enforce?",
          value: "Based on policy, the SIIF implementation arrangements do not require strict validation and approval rather, a technical review is conducted to ensure alignment and feasibility of the proposed interventions."
        },
        {
          key: "exceptions_edge_cases",
          label: "What exceptions/edge cases occur frequently, and how should they be handled?",
          value: "None."
        },
        {
          key: "reports_dashboards",
          label: "What reports/dashboards are required, and what questions should they answer?",
          value: "1. School Interventions\n2. Beneficiaries per grade level\n3. Activities\n4. Budget Estimates\n5. Utilization Rate\n6. Completion Rate"
        }
      ],
      dataValidation: [
        {
          key: "core_data_entities",
          label: "What are the core data entities and their key fields?",
          value: "1. School intervention \n2. Number of beneficiaries and grade levels \n3. Activities \n4. Budget Estimates \n5. SIIF Utilization"
        },
        {
          key: "mandatory_optional",
          label: "What data is mandatory vs optional at each step?",
          value: "All core data data entities are mandatory."
        },
        {
          key: "data_quality_rules",
          label: "What data quality rules must be enforced?",
          value: "1. School intervention - Predetermined\n2. Number of beneficiaries and grade levels - Open ended \n3. Activities - Predetermined \n4. Budget Estimates - Open ended provided the cap is observed \n5. SIIF Utilization - Open ended provided the cap is observed"
        },
        {
          key: "data_migration",
          label: "What historical data must be migrated, and how far back?",
          value: "None."
        },
        {
          key: "role_based_access",
          label: "Who can see or edit which data (role-based access expectations)?",
          value: "1. School Head - Can Edit and update. \n2. SDO SBM Focal - Can edit and view. \n3. RO SBM Focal - View only access."
        },
        {
          key: "identifiers_cross_system",
          label: "What identifiers must match across systems (IPC, project ID, school ID)?",
          value: "None."
        }
      ]
    }
  }
];
