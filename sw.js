const C="kharcha-v2",F=["./","index.html","manifest.webmanifest"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(clients.claim()));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;
e.respondWith(fetch(e.request).then(r=>{const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));return r}).catch(()=>caches.match(e.request)))});
self.addEventListener("push",e=>{let d={};try{d=e.data.json().data||{}}catch(x){}
e.waitUntil(self.registration.showNotification(d.title||"Kharcha yaad dilana",{body:d.body||"Aaj ka kharcha likh lo.",icon:"icon-192.png",tag:"daily"}))});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.openWindow(self.registration.scope))});
