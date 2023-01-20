import{u as $,a as W,f as B,p as S}from"./contractToast.71bb9cb3.js";import{r as i,d as E,w as j,a as V,o as d,c as C,b as l,e as r,u as n,i as F,F as D,f as N,t as A,g as P,h as I,j as R,S as Y}from"./index.7fbac3af.js";const q=async()=>{const{connectToContract:k}=$(),{contractToastError:s}=W(),t=await k("PiggyBank"),m=i(B(await t.getBalance())),p=i(await t.getSavingNames()),v=i(!1),u=i(null),w=i(null);t.on("BalanceChanged",async o=>{m.value=B(o),await g(),v.value=!1}),t.on("SavingCreated",async()=>{s(async()=>{p.value=await t.getSavingNames()})});const b=async(o,c)=>{s(async()=>{await(await t.createSaving(o,S(c))).wait()})},g=async()=>{s(async()=>{w.value=await t.getSavingDetails(u.value)})};return{balance:m,savingNames:p,pending:v,savingDetails:w,selectedSaving:u,createSaving:b,getSavingDetails:g,deposit:async o=>{!u.value||s(async()=>{const c=await t.deposit(u.value,S(o),{value:S(o)});v.value=!0,await c.wait()})},withdraw:async o=>{!u.value||s(async()=>{await t.withdraw(u.value,S(o))})},formatEther:B}},z={class:"flex justify-content-between"},G={class:"p-float-label w-full"},H=l("label",{for:"savingName"},"Saving name",-1),J={class:"p-float-label w-full"},K=l("label",{for:"withdrawLimit"},"Withdraw limit",-1),M={class:"p-inputgroup"},O={class:"p-inputgroup"},Q=E({name:"PiggyBank",async setup(k){let s,t;const{savingNames:m,savingDetails:p,createSaving:v,getSavingDetails:u,deposit:w,withdraw:b,formatEther:g,selectedSaving:f,pending:T}=([s,t]=j(()=>q()),s=await s,t(),s),o=i(""),c=i(""),y=i(""),x=i("");return(X,e)=>{const _=V("InputText"),h=V("Button"),L=V("Dropdown"),U=V("ProgressSpinner");return d(),C(D,null,[l("div",z,[l("span",G,[r(_,{id:"savingName",type:"text",modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=a=>o.value=a),class:"w-full"},null,8,["modelValue"]),H]),l("span",J,[r(_,{id:"withdrawLimit",type:"text",modelValue:c.value,"onUpdate:modelValue":e[1]||(e[1]=a=>c.value=a),class:"w-full"},null,8,["modelValue"]),K])]),r(h,{class:"p-button-outlined w-full",onClick:e[2]||(e[2]=a=>n(v)(o.value,c.value)),label:"Create saving"}),r(L,{modelValue:n(f),"onUpdate:modelValue":e[3]||(e[3]=a=>F(f)?f.value=a:null),options:n(m),placeholder:"Your saving accounts",class:"w-full mt-8",onChange:e[4]||(e[4]=a=>n(u)())},null,8,["modelValue","options"]),n(p)?(d(),C(D,{key:0},[n(T)?(d(),N(U,{key:0,class:"w-full"})):(d(),C(D,{key:1},[l("p",null," Current Amount: "+A(n(g)(n(p).currentAmount)),1),l("p",null," Saving Limit: "+A(n(g)(n(p).savingLimit)),1),l("div",M,[r(_,{placeholder:"Deposit amount",modelValue:y.value,"onUpdate:modelValue":e[5]||(e[5]=a=>y.value=a)},null,8,["modelValue"]),r(h,{icon:"pi pi-upload",class:"p-button-warning p-button-lg",onClick:e[6]||(e[6]=a=>n(w)(y.value))})]),l("div",O,[r(_,{placeholder:"Withdraw amount",modelValue:x.value,"onUpdate:modelValue":e[7]||(e[7]=a=>x.value=a)},null,8,["modelValue"]),r(h,{icon:"pi pi-download",class:"p-button-warning p-button-lg",onClick:e[8]||(e[8]=a=>n(b)(x.value))})])],64))],64)):P("",!0)],64)}}}),te=E({name:"PiggyBankView",setup(k){const{connectedAddress:s}=I();return(t,m)=>(d(),C("main",null,[(d(),N(Y,null,{default:R(()=>[n(s)?(d(),N(Q,{key:0})):P("",!0)]),_:1}))]))}});export{te as default};
