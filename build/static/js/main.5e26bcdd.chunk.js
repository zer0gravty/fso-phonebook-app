(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{21:function(e,n,t){},22:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t(1),o=t(15),a=t.n(o),u=(t(21),t(6)),i=t(3),s=function(e){var n=e.filterBy,t=e.action;return Object(r.jsxs)("div",{children:["filter shown with: ",Object(r.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.name,t=e.number,c=e.deletePerson;return Object(r.jsxs)("p",{children:[n," ",t," ",Object(r.jsx)("button",{onClick:c,children:"Delete"})]})},b=function(e){var n=e.phonebook,t=e.deletePerson;return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)("div",{children:n.map((function(e){var n=e.id,c=e.name,o=e.number;return Object(r.jsx)(d,{name:c,number:o,deletePerson:function(){return t(n)}},n)}))})]})},l=function(e){var n=e.submit,t=e.newName,c=e.newNumber,o=e.setNewName,a=e.setNewNumber;return Object(r.jsxs)("div",{children:[Object(r.jsx)("h3",{children:"add a new"}),Object(r.jsxs)("form",{onSubmit:n,children:[Object(r.jsxs)("div",{children:["name: ",Object(r.jsx)("input",{value:t,onChange:function(e){return o(e.target.value)}})]}),Object(r.jsxs)("div",{children:["number: ",Object(r.jsx)("input",{value:c,onChange:function(e){return a(e.target.value)}})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})]})},j=function(e){var n=e.statusCode;return n>=200&&n<=299?Object(r.jsx)("div",{className:"banner",style:{backgroundColor:"green"},children:"Person successfully added."}):404===n?Object(r.jsx)("div",{className:"banner",style:{backgroundColor:"red"},children:"Person has already been removed. Refreshing data."}):n>=300&&n<=599?Object(r.jsx)("div",{className:"banner",style:{backgroundColor:"red"},children:"Error processing request."}):void 0},f=(t(22),t(4)),h=t.n(f),m="/api/persons/",O={getAll:function(){return h.a.get(m).then((function(e){return e.data}))},remove:function(e){return h.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},create:function(e){return h.a.post(m,e).then((function(e){return e.data}))},update:function(e,n){return h.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))}},v=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],a=Object(c.useState)(""),d=Object(i.a)(a,2),f=d[0],h=d[1],m=Object(c.useState)(""),v=Object(i.a)(m,2),p=v[0],x=v[1],w=Object(c.useState)(""),g=Object(i.a)(w,2),N=g[0],k=g[1],y=Object(c.useState)(null),C=Object(i.a)(y,2),P=C[0],E=C[1];Object(c.useEffect)((function(){O.getAll().then((function(e){return o(e)})).catch((function(e){console.log("Error fetching data from database:\n\t".concat(e))}))}),[P]);var S=function(e,n){E(e),setTimeout((function(){E(null)}),n)},A=N?t.filter((function(e){return e.name.toLowerCase().startsWith(N.toLowerCase())})):t;return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),P&&Object(r.jsx)(j,{statusCode:P}),Object(r.jsx)(s,{filterBy:N,action:function(e){k(e.target.value)}}),Object(r.jsx)(l,{submit:function(e){e.preventDefault();var n=Date.now(),r={name:f,number:p,id:n},c=t.find((function(e){return e.name===f}));c?window.confirm("".concat(r.name," is already added to the phonebook; replace the old number with a new one?"))&&O.update(c.id,Object(u.a)(Object(u.a)({},c),{},{number:p})).then((function(e){S(201,5e3),o(t.map((function(n){return n.id!==c.id?n:e})))})).catch((function(e){console.log("Error updating person's number:\n\t".concat(e)),S(404,5e3)})):O.create(r).then((function(e){S(201,5e3),o(t.concat(e))})).catch((function(e){console.log("There was an error in adding the person:\n\t".concat(e)),S(500,5e3)})),h(""),x("")},setNewName:h,setNewNumber:x,newName:f,newNumber:p}),Object(r.jsx)(b,{phonebook:A,deletePerson:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Are you sure you want to delete ".concat(n.name,"?"))&&O.remove(n.id).then((function(){o(t.filter((function(n){return n.id!==e})))})).catch((function(n){S(404,5e3),console.log("Error deleting person with id ".concat(e,":\n\t").concat(n))}))}})]})};a.a.render(Object(r.jsx)(v,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.5e26bcdd.chunk.js.map