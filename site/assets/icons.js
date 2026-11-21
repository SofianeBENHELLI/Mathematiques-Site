/* Original line icons, shared by the two Sanaa sites. */
const WORKSHOP_ICONS=(()=>{
const paths={
polynomes:'<path d="M3 19h18M7 3v18M4 5q8 26 16 0"/>',
suites:'<path d="M3 20h18M4 17h4v-4h4V9h4V5h5"/><circle cx="8" cy="13" r="1"/><circle cx="16" cy="5" r="1"/>',
d1:'<path d="M3 20h18M5 3v18M6 17q8 2 13-13M5 19 21 5"/><circle cx="14" cy="11" r="2"/>',
d2:'<path d="M3 20h18M4 17C7-4 15 29 20 5"/><path d="m16 5 4 0 1 4"/>',
d3:'<path d="M3 20h18M5 3v18M6 17c9 0 12-3 14-14"/>',
d4:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18M12 12l6-7M18 5v7"/>',
g1:'<path d="M5 20V4m0 0-3 4m3-4 3 4M5 20l15-6m0 0-4-1m4 1-2 4M5 20 17 5m0 0-4 1m4-1v4"/>',
g2:'<path d="M3 19 21 8M13 5v9m0 0 4-2-2-4"/><circle cx="13" cy="5" r="2"/>',
p1:'<path d="M3 12 11 6l9-3M11 6l9 3M3 12l8 6 9-3M11 18l9 3"/><circle cx="3" cy="12" r="1"/>',
p2:'<path d="M3 21h18M5 20V14h3v6M11 20V4h3v16M17 20v-9h3v9"/>',
m1:'<path d="m5 19 14-14"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/>',
m2:'<path d="m8 6-5 6 5 6m8-12 5 6-5 6m-3-15-2 18"/>',
flask:'<path d="M9 3h6M10 3v7L4 19q-1 2 2 2h12q3 0 2-2l-6-9V3M7 15h10"/><circle cx="11" cy="17" r=".7"/>',
light:'<path d="M3 12h5m8 0h5M4 8l3 2M4 16l3-2"/><rect x="9" y="4" width="6" height="16" rx="2"/>',
reaction:'<path d="M3 7h17l-4-4M21 17H4l4 4M20 7l-4 4M4 17l4-4"/>',
titration:'<path d="M10 3h4v9h-4zM12 12v3M7 17l-2 4h14l-2-4M9 7h5"/><circle cx="12" cy="17" r=".6"/>',
atom:'<ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"/><circle cx="12" cy="12" r="2"/>',
phases:'<path d="M6 3v16q0 2 2 2h8q2 0 2-2V3M6 10h12M6 15h12"/>',
molecule:'<path d="m6 6 12 2-6 11-6-13"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="8" r="3"/><circle cx="12" cy="19" r="3"/>',
heat:'<path d="M13 3q2 6 5 8 6 10-6 11C1 21 4 12 8 9c-1 5 4 7 5-6Z"/>',
force:'<circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><path d="M1 5h8L6 2M23 19h-8l3 3"/>',
field:'<path d="M3 3q12 9 18 0M3 9q12 9 18 0M3 15q12 9 18 0M11 6l3 1-2 3M11 12l3 1-2 3"/>',
motion:'<path d="M3 19q8-1 10-11h8m0 0-3-3m3 3-3 3M3 5h4M3 9h3"/><circle cx="11" cy="14" r="2"/>',
circuit:'<path d="M4 9V4h7m3 0h6v16H4v-7M11 1v6m3-5v4M2 9h4M2 13h4"/><circle cx="12" cy="20" r="2"/>',
energy:'<path d="m13 2-9 12h7l-1 8 10-13h-7z"/>',
wave:'<path d="M2 12c4-14 6 14 10 0s6 14 10 0M2 19h20"/>',
lens:'<path d="M12 2v20M3 5l9 7 9 7M3 19l9-7 9-7M9 5l3-3 3 3M9 19l3 3 3-3"/>',
prism:'<path d="m12 3-9 17h18ZM1 10h7M16 10l7-3M17 13h6M19 17l4 3"/>',
photon:'<path d="m12 2 2 7 7-3-4 6 5 5-8-1-2 7-2-7-8 1 5-5-4-6 7 3z"/>',
method:'<path d="M5 3h14v18H5zM8 7h8M8 12h8M8 17h5"/><path d="m8 11 1 1 2-3"/>',
bac:'<path d="M5 3h9l5 5v13H5zM14 3v5h5M8 12h8M8 16h5"/><circle cx="18" cy="18" r="5"/><path d="M18 15v3l2 1"/>'
};
const science={c1:'flask',c2:'light',c3:'reaction',c4:'titration',c5:'atom',c6:'phases',c7:'molecule',c8:'flask',c9:'heat',p1:'force',p2:'field',p3:'motion',p4:'circuit',p5:'energy',p6:'wave',p7:'lens',p8:'prism',p9:'photon',m1:'method'};
return {render:(id,subject='maths')=>`<svg class="workshop-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${paths[subject==='science'?science[id]||id:id]||paths.method}</svg>`};
})();
if(typeof module!=='undefined')module.exports=WORKSHOP_ICONS;
