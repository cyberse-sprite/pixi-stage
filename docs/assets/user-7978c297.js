import{u as H,c as W,a as $,i as q,b as E,d as J,e as M,f as G,g as X,r as m,h as V,j as z,w as Y,k as Q,l as Z,m as ee,o as oe,n as te,p as ne,q as re,s as ae,t as x,v as se,V as ie,x as le,y as de,A as ce,z as P,B as i,C as A,D as ue,E as F,F as C,G as fe,H as ve,I as T,J as he,N as ge,K as be,_ as me}from"./index-863099ea.js";import{i as w,o as pe}from"./utils-b025b989.js";const _e={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}};Object.assign(Object.assign(Object.assign({},H.props),_e),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function});const ye=W("n-tag"),ze=W("n-avatar-group"),xe=$("avatar",`
 width: var(--n-merged-size);
 height: var(--n-merged-size);
 color: #FFF;
 font-size: var(--n-font-size);
 display: inline-flex;
 position: relative;
 overflow: hidden;
 text-align: center;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 --n-merged-color: var(--n-color);
 background-color: var(--n-merged-color);
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[q(E("&","--n-merged-color: var(--n-color-modal);")),J(E("&","--n-merged-color: var(--n-color-popover);")),E("img",`
 width: 100%;
 height: 100%;
 `),M("text",`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),$("icon",`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),M("text","line-height: 1.25")]),ke=Object.assign(Object.assign({},H.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),Be=G({name:"Avatar",props:ke,setup(t){const{mergedClsPrefixRef:c,inlineThemeDisabled:f}=X(t),r=m(!1);let d=null;const u=m(null),a=m(null),R=()=>{const{value:e}=u;if(e&&(d===null||d!==e.innerHTML)){d=e.innerHTML;const{value:o}=a;if(o){const{offsetWidth:s,offsetHeight:n}=o,{offsetWidth:l,offsetHeight:O}=e,B=.9,S=Math.min(s/l*B,n/O*B,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${S})`}}},p=V(ze,null),_=z(()=>{const{size:e}=t;if(e)return e;const{size:o}=p||{};return o||"medium"}),k=H("Avatar","-avatar",xe,se,t,c),v=V(ye,null),h=z(()=>{if(p)return!0;const{round:e,circle:o}=t;return e!==void 0||o!==void 0?e||o:v?v.roundRef.value:!1}),y=z(()=>p?!0:t.bordered||!1),g=e=>{var o;if(!j.value)return;r.value=!0;const{onError:s,imgProps:n}=t;(o=n==null?void 0:n.onError)===null||o===void 0||o.call(n,e),s&&s(e)};Y(()=>t.src,()=>r.value=!1);const I=z(()=>{const e=_.value,o=h.value,s=y.value,{color:n}=t,{self:{borderRadius:l,fontSize:O,color:B,border:S,colorModal:K,colorPopover:U},common:{cubicBezierEaseInOut:D}}=k.value;let L;return typeof e=="number"?L=`${e}px`:L=k.value.self[Q("height",e)],{"--n-font-size":O,"--n-border":s?S:"none","--n-border-radius":o?"50%":l,"--n-color":n||B,"--n-color-modal":n||K,"--n-color-popover":n||U,"--n-bezier":D,"--n-merged-size":`var(--n-avatar-size-override, ${L})`}}),b=f?Z("avatar",z(()=>{const e=_.value,o=h.value,s=y.value,{color:n}=t;let l="";return e&&(typeof e=="number"?l+=`a${e}`:l+=e[0]),o&&(l+="b"),s&&(l+="c"),n&&(l+=ee(n)),l}),I,t):void 0,j=m(!t.lazy);oe(()=>{if(w)return;let e;const o=te(()=>{e==null||e(),e=void 0,t.lazy&&(e=pe(a.value,t.intersectionObserverOptions,j))});ne(()=>{o(),e==null||e()})});const N=m(!t.lazy);return{textRef:u,selfRef:a,mergedRoundRef:h,mergedClsPrefix:c,fitTextTransform:R,cssVars:f?void 0:I,themeClass:b==null?void 0:b.themeClass,onRender:b==null?void 0:b.onRender,hasLoadError:r,handleError:g,shouldStartLoading:j,loaded:N,mergedOnLoad:e=>{var o;const{onLoad:s,imgProps:n}=t;s==null||s(e),(o=n==null?void 0:n.onLoad)===null||o===void 0||o.call(n,e),N.value=!0}}},render(){var t,c;const{$slots:f,src:r,mergedClsPrefix:d,lazy:u,onRender:a,mergedOnLoad:R,shouldStartLoading:p,loaded:_,hasLoadError:k}=this;a==null||a();let v;const h=!_&&!k&&(this.renderPlaceholder?this.renderPlaceholder():(c=(t=this.$slots).placeholder)===null||c===void 0?void 0:c.call(t));return this.hasLoadError?v=this.renderFallback?this.renderFallback():re(f.fallback,()=>[x("img",{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):v=ae(f.default,y=>{if(y)return x(ie,{onResize:this.fitTextTransform},{default:()=>x("span",{ref:"textRef",class:`${d}-avatar__text`},y)});if(r){const{imgProps:g}=this;return x("img",Object.assign(Object.assign({},g),{loading:w&&!this.intersectionObserverOptions&&u?"lazy":"eager",src:w||p||_?r:void 0,onLoad:R,"data-image-src":r,onError:this.handleError,style:[g==null?void 0:g.style,{objectFit:this.objectFit},h?{height:"0",width:"0",visibility:"hidden",position:"absolute"}:""]}))}}),x("span",{ref:"selfRef",class:[`${d}-avatar`,this.themeClass],style:this.cssVars},v,u&&h)}}),Fe={style:{display:"flex","flex-direction":"column","min-height":"0",height:"100%"}},Ce={class:"head-back"},Re={style:{"padding-top":"10px",display:"flex","justify-content":"end"}},je={class:"head-content"},Oe={class:"avatar-box"},Se={class:"head-text"},Le={style:{"font-size":"large",color:"#fff"}},Ee={style:{color:"rgba(255, 255, 255, 0.8)"}},Pe={style:{flex:"1","min-height":"0","overflow-y":"auto"}},Te={class:"link-item"},we=["href"],He={style:{"font-size":"large",color:"#222"}},Ie={style:{color:"#888"}},Ne=G({__name:"user",setup(t){const c=le(),f=de(),r=m({});return ce(f.params.id).then(d=>{r.value=d}),(d,u)=>(T(),P("div",Fe,[i("div",Ce,[i("div",Re,[A(F(ge),{onClick:u[0]||(u[0]=a=>F(c).drawer=!1),color:"#fff",ghost:"",style:{"margin-right":"10px"}},{default:ue(()=>[he(" 关闭 ")]),_:1})]),i("div",je,[i("div",Oe,[A(F(Be),{src:F(be)(`${r.value.avatar}`),size:128,style:{border:"1px #eee solid"},round:""},null,8,["src"])]),i("div",Se,[i("div",Le,C(r.value.nickname),1),i("div",Ee,C(r.value.intro),1)])])]),i("div",Pe,[(T(!0),P(fe,null,ve(r.value.links,a=>(T(),P("div",Te,[i("a",{href:a.link,target:"_blank"},[i("div",He,C(a.plat),1),i("div",Ie,C(a.link),1)],8,we)]))),256))])]))}});const Ve=me(Ne,[["__scopeId","data-v-ee3ebb1a"]]);export{Ve as default};
