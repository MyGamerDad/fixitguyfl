'use strict';
const directory=document.querySelector('#services');
const search=document.querySelector('#task-search');
const category=document.querySelector('#task-category');
const groups=[...directory.querySelectorAll('details')];
const count=document.querySelector('#match-count');
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
  group.hidden=!matches||(category.value!==''&&group.dataset.category!==category.value);
  if(!group.hidden){total+=matches;if(terms.length||category.value!=='')group.open=true;}
 });
 count.textContent=total+(total===1?' task':' tasks')+(total===0?' found. Try another search or describe your job in the quote form.':'');
}
search.addEventListener('input',filter);category.addEventListener('change',filter);
const list=document.querySelector('#job-list');
const form=document.querySelector('#contact-form');
const serviceSummary=document.querySelector('#selected-services');
function update(){
 const selected=[...directory.querySelectorAll('input[type=checkbox]:checked')];
 document.querySelector('#selected-count').textContent='('+selected.length+')';
 document.querySelector('#empty-list').hidden=selected.length>0;
 const names=selected.map(input=>input.parentElement.textContent.trim());
 list.replaceChildren(...names.map(name=>{const li=document.createElement('li');li.textContent=name;return li;}));
 form.elements.selected_tasks.value=names.join('\n');
 serviceSummary.textContent=selected.length?selected.length+' selected catalog '+(selected.length===1?'task will':'tasks will')+' be included in your request.':'No catalog tasks selected.';
}
directory.addEventListener('change',update);
document.querySelector('#clear-list').addEventListener('click',()=>{directory.querySelectorAll('input:checked').forEach(input=>input.checked=false);update();});
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

 const status=document.querySelector('#contact-status');
 if(!form.elements.customer.value.trim()||!form.elements.details.value.trim()){
  event.preventDefault();status.hidden=false;status.textContent='Please enter your name and describe the services you need.';return;
 }
 status.hidden=true;update();
});
document.querySelector('#year').textContent=new Date().getFullYear();
filter();update();