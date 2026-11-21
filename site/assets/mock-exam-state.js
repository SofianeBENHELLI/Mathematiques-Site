/* Pure state transitions: a wall-clock deadline survives navigation and reload. */
const BAC_STATE=(()=>{
const questions=exam=>exam.sections.flatMap(s=>s.questions);
const fresh=()=>({version:1,subject:'maths-bac',attempts:[]});
const remaining=(a,now=Date.now())=>a.status==='running'?Math.max(0,a.deadlineAt-now):0;
function finish(a,now=Date.now()){if(a.status!=='running')return a;return {...a,status:now>=a.deadlineAt?'expired':'submitted',endedAt:Math.max(a.startedAt,Math.min(now,a.deadlineAt))};}
function create(exam,id,now=Date.now()){return {id,examId:exam.id,startedAt:now,deadlineAt:now+exam.minutes*60000,status:'running',endedAt:null,answers:{},marks:{}};}
function normalize(raw,exams,now=Date.now()){
 if(!raw||raw.version!==1||raw.subject!=='maths-bac'||!Array.isArray(raw.attempts)||raw.attempts.length>20)throw Error('Sauvegarde de bac blanc non reconnue.');
 const clean=fresh(),seen=new Set();let active=false;
 for(const a of raw.attempts){const exam=exams.find(e=>e.id===a?.examId);if(!exam||typeof a.id!=='string'||a.id.length>80||seen.has(a.id)||!Number.isFinite(a.startedAt)||a.startedAt<=0||a.startedAt>now+300000||!['running','submitted','expired'].includes(a.status))continue;
 let b=create(exam,a.id,a.startedAt);seen.add(a.id);for(const q of questions(exam)){if(typeof a.answers?.[q.id]==='string')b.answers[q.id]=a.answers[q.id].slice(0,8000);b.marks[q.id]=q.rubric.map((_,i)=>a.marks?.[q.id]?.[i]===true)}
 if(a.status!=='running'){b.status=a.status;b.endedAt=Math.max(b.startedAt,Math.min(Number.isFinite(a.endedAt)?a.endedAt:b.deadlineAt,b.deadlineAt));}else if(now>=b.deadlineAt)b=finish(b,now);else if(active)continue;else active=true;
 if(b.status==='running')b.marks={};clean.attempts.push(b);
 }
 return clean;
}
const score=(a,exam)=>a.status==='running'?0:questions(exam).reduce((sum,q)=>sum+q.rubric.reduce((n,c,i)=>n+(a.marks[q.id]?.[i]?c.points:0),0),0);
const answered=(a,exam)=>questions(exam).filter(q=>a.answers[q.id]?.trim()).length;
const clock=ms=>{const seconds=Math.max(0,Math.ceil(ms/1000));return [Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(n=>String(n).padStart(2,'0')).join(':')};
return{fresh,questions,create,normalize,remaining,finish,score,answered,clock};
})();
if(typeof module!=='undefined')module.exports=BAC_STATE;
