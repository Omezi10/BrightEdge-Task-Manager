export const P={home:'<path d="M3 11 12 3l9 8M5 9.5V21h5v-6h4v6h5V9.5"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',play:'<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4z" fill="currentColor"/>',check:'<path d="m5 12.5 4.5 4.5L19 7"/>',cc:'<circle cx="12" cy="12" r="10"/><path d="m8 12.5 3 3 5-6"/>',plus:'<path d="M12 5v14M5 12h14"/>',clip:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>',edit:'<path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4"/>',trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',dots:'<circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',arr:'<path d="M5 12h14M13 6l6 6-6 6"/>',l:'<path d="m15 6-6 6 6 6"/>',r:'<path d="m9 6 6 6-6 6"/>',filt:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',s:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'};

export const seed=()=>[
 ['Finalize project proposal','Review and approve the client proposal.','High','2025-11-03','2025-11-03'],
 ['Update team documentation','Add the latest project updates.','High','2025-11-02','2025-11-02'],
 ['Plan next sprint','Organize tasks for the next development sprint.','Medium','2025-11-04','2025-11-03'],
 ['Send client feedback','Share the design mockups with the client.','Medium','2025-11-05','2025-11-03'],
 ['Prepare marketing banner','Create banner for upcoming campaign.','Low','2025-11-06','2025-11-03'],
 ['Conduct team meeting','Discuss project progress and next steps.','Medium','2025-11-07','2025-11-03'],
 ['Review budget forecast','Check Q4 numbers with finance.','Low','2025-11-08','2025-11-02'],
 ['Prepare monthly report','Compile team performance report.','Medium','2025-11-01','2025-11-01',1,'2025-11-01'],
 ['Design marketing materials','Create social media graphics and banners.','Medium','2025-10-30','2025-10-29',1,'2025-10-30'],
 ['Fix login issue','Resolve authentication bug.','High','2025-10-29','2025-10-28',1,'2025-10-29'],
 ['Team meeting notes','Summarize the team meeting.','Low','2025-10-28','2025-10-27',1,'2025-10-28'],
 ['Update client records','Sync CRM entries for Q3.','Medium','2025-10-28','2025-10-26',1,'2025-10-28']
].map((a,i)=>({id:i+1,title:a[0],desc:a[1],priority:a[2],due:a[3],created:a[4],done:!!a[5],completedOn:a[6]||null}));