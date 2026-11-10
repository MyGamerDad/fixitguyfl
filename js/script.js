'use strict';
const directory=document.querySelector('#services');
const search=document.querySelector('#task-search');
const category=document.querySelector('#task-category');
const groups=[...directory.querySelectorAll('details')];
const count=document.querySelector('#match-count');
const taskSections=[...directory.querySelectorAll('.task-groups')];
const categoryNames=new Map([...category.options].map(option=>[option.value,option.text]));
const otherTemplate=document.querySelector('#other-task-template');
const otherTasks=new Map();
groups.forEach(group=>{
 const row=otherTemplate.content.firstElementChild.cloneNode(true);
 const checkbox=row.querySelector('input');
 const description=row.querySelector('textarea');
 const title=categoryNames.get(group.dataset.category);
 description.id='other-description-'+group.dataset.category;
 checkbox.setAttribute('aria-controls',description.id);
 checkbox.setAttribute('aria-label','Other task in '+title);
 description.setAttribute('aria-label','Describe the other task in '+title);
 group.querySelector('ul').append(row);
 otherTasks.set(checkbox,{group,description});
});
function norm(s){return s.toLowerCase().replace(/[^a-z0-9]/g,'');}
function filter(){
 let total=0;
 const terms=search.value.trim().split(/\s+/).map(norm).filter(Boolean);
 groups.forEach(group=>{
  let matches=0;
  group.querySelectorAll('[data-task]').forEach(row=>{
   const match=terms.every(term=>norm(row.textContent).includes(term));
   row.hidden=!match;if(match)matches++;
  });
  const chosenCategory=category.value===group.dataset.category;
  const categoryMatch=category.value===''||chosenCategory||
   (category.value==='network'&&group.hasAttribute('data-network'));
  group.hidden=!categoryMatch||(!matches&&!chosenCategory);
  if(!group.hidden){
   total+=matches;
   if(terms.length||(category.value!==''&&category.value!=='network'))group.open=true;
  }
 });
 taskSections.forEach(section=>{
  section.hidden=!section.querySelector('details:not([hidden])');
 });
 count.textContent=total+(total===1?' task':' tasks')+(total===0?' found. Choose a category to describe an Other task.':'');
}
search.addEventListener('input',filter);category.addEventListener('change',filter);
const list=document.querySelector('#job-list');
const form=document.querySelector('#contact-form');
const serviceSummary=document.querySelector('#selected-services');
const requestType=form.elements.request_type;
const jobDetails=form.elements.details;
function update(syncRequestType=false){
 const selected=[...directory.querySelectorAll('input[type=checkbox]:checked')];
 document.querySelector('#selected-count').textContent='('+selected.length+')';
 document.querySelector('#empty-list').hidden=selected.length>0;
 const referralCount=selected.filter(input=>input.closest('[data-referral]')).length;
 const selectedGroups=new Map();
 selected.forEach(input=>{
  const group=input.closest('details');
  const other=otherTasks.get(input);
  const description=other?.description.value.trim();
  const name=other?'Other task'+(description?'\n'+description:' (description required)'):input.parentElement.textContent.trim();
  if(!selectedGroups.has(group))selectedGroups.set(group,[]);
  selectedGroups.get(group).push(name);
 });
 jobDetails.required=!selected.some(input=>otherTasks.has(input));
 if(syncRequestType&&selected.length){
  requestType.selectedIndex=referralCount===0?0:referralCount===selected.length?1:2;
 }
 const requestGroups=[];
 const summaryGroups=[];
 selectedGroups.forEach((names,group)=>{
  const title=categoryNames.get(group.dataset.category)+(group.closest('[data-referral]')?' (independent provider referral)':'');
  const item=document.createElement('li');
  const heading=document.createElement('strong');
  const tasks=document.createElement('ul');
  heading.textContent=title;
  tasks.append(...names.map(name=>{
   const task=document.createElement('li');
   task.textContent=name;
   return task;
  }));
  item.append(heading,tasks);
  summaryGroups.push(item);
  requestGroups.push(title+'\n'+names.map(name=>'• '+name.replace(/\n/g,'\n  ')).join('\n'));
 });
 list.replaceChildren(...summaryGroups);
 form.elements.selected_tasks.value=requestGroups.join('\n\n');
 const summary=selected.length?selected.length+' selected '+(selected.length===1?'task will':'tasks will')+' be included in your request.':'No tasks selected.';
 if(serviceSummary.textContent!==summary)serviceSummary.textContent=summary;
}
directory.addEventListener('change',event=>{
 const input=event.target;
 if(!input.matches('input[type=checkbox]'))return;
 const other=otherTasks.get(input);
 if(other){
  other.description.parentElement.hidden=!input.checked;
  other.description.setCustomValidity('');
 }
 update(true);
});
directory.addEventListener('input',event=>{
 if(!event.target.matches('.other-task textarea'))return;
 event.target.setCustomValidity('');
 update();
});
document.querySelector('#clear-list').addEventListener('click',()=>{
 directory.querySelectorAll('input:checked').forEach(input=>input.checked=false);
 otherTasks.forEach(({description})=>{
  description.value='';
  description.setCustomValidity('');
  description.parentElement.hidden=true;
 });
 update();
});
document.querySelector('#browse-network').addEventListener('click',()=>{
 search.value='';
 category.value='network';
 filter();
});
document.querySelector('#referral-estimate').addEventListener('click',()=>{
 const hasDirectTask=directory.querySelector('.task-groups:not([data-referral]) input:checked');
 requestType.selectedIndex=hasDirectTask?2:1;
});
document.querySelectorAll('[data-group]').forEach(link=>link.addEventListener('click',()=>{
 const group=link.dataset.group;
 search.value='';category.value=group==='engine'?'6':'';
 filter();
 groups.forEach(el=>el.open=group==='home'?['0','1','2'].includes(el.dataset.category):group==='tech'?['4','5'].includes(el.dataset.category):group==='engine'?el.dataset.category==='6':['3','7','8'].includes(el.dataset.category));
}));

const fileInputs=[...form.querySelectorAll('input[type=file]')];
const uploadStatus=document.querySelector('#upload-status');
function attachmentError(files){
 const total=files.reduce((sum,file)=>sum+file.size,0);
 if(files.some(file=>! /\.(jpe?g|png|pdf)$/i.test(file.name)))return 'Please choose only JPG, PNG, or PDF files.';
 if(total>10000000)return 'Your attachments exceed 10 MB combined. Choose smaller files or use the sharing-link field.';
 return '';
}
function validateAttachments(){
 const files=fileInputs.flatMap(input=>[...input.files]);
 const error=attachmentError(files);
 fileInputs.forEach(input=>input.setCustomValidity(error));
 uploadStatus.dataset.error=String(Boolean(error));
 uploadStatus.textContent=error||(files.length?files.length+' file(s) selected · '+(files.reduce((sum,file)=>sum+file.size,0)/1000000).toFixed(2)+' MB of 10 MB':'No files selected.');
 return !error;
}
fileInputs.forEach(input=>input.addEventListener('change',validateAttachments));
document.querySelector('#clear-files').addEventListener('click',()=>{fileInputs.forEach(input=>input.value='');validateAttachments();});
form.addEventListener('submit',event=>{
 if(!validateAttachments()){event.preventDefault();form.reportValidity();return;}

 const missing=[...otherTasks].find(([input,{description}])=>input.checked&&!description.value.trim());
 if(missing){
  event.preventDefault();
  const {group,description}=missing[1];
  if(group.hidden){
   search.value='';
   category.value=group.dataset.category;
   filter();
  }
  group.open=true;
  description.setCustomValidity('Describe this task or uncheck Other task.');
  description.focus();
  description.reportValidity();
  return;
 }

 const status=document.querySelector('#contact-status');
 if(!form.elements.service_street.value.trim()||!form.elements.service_city.value.trim()){
  event.preventDefault();status.hidden=false;status.textContent='Please enter the street address and city where the work is needed.';return;
 }
 if(!form.elements.customer.value.trim()||(jobDetails.required&&!jobDetails.value.trim())){
  event.preventDefault();status.hidden=false;status.textContent='Please enter your name and describe the services you need.';return;
 }
 status.hidden=true;update();
});
document.querySelector('#year').textContent=new Date().getFullYear();
filter();update();
