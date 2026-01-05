/* ---------- PANEL ---------- */

function openPanel(type){

  const titles={

    lesson:"إضافة حصة",

    homework:"إضافة واجب",

    exam:"إضافة امتحان"

  };

  document.getElementById("panelTitle").innerText = titles[type];

  document.getElementById("panel").style.display="flex";

  document.getElementById("preview").innerHTML="";

}

function closePanel(){

  document.getElementById("panel").style.display="none";

}

function previewImages(e){

  const preview=document.getElementById("preview");

  [...e.target.files].forEach(file=>{

    const img=document.createElement("img");

    img.src=URL.createObjectURL(file);

    preview.appendChild(img);

  });

}

/* ---------- 3D PAPER ---------- */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,1,0.1,100);

camera.position.z=5;

const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});

renderer.setSize(400,400);

document.getElementById("paper3d").appendChild(renderer.domElement);

/* Canvas texture (exam paper look) */

const c = document.createElement("canvas");

c.width = 512;

c.height = 512;

const ctx = c.getContext("2d");

ctx.fillStyle="#f8f8f8";

ctx.fillRect(0,0,512,512);

ctx.strokeStyle="#d0d0d0";

for(let i=50;i<512;i+=40){

  ctx.beginPath();

  ctx.moveTo(0,i);

  ctx.lineTo(512,i);

  ctx.stroke();

}

ctx.fillStyle="#000";

ctx.font="28px Arial";

ctx.fillText("امتحان رياضيات",150,60);

const texture = new THREE.CanvasTexture(c);

const paper = new THREE.Mesh(

  new THREE.PlaneGeometry(3,4),

  new THREE.MeshStandardMaterial({map:texture})

);

scene.add(paper);

scene.add(new THREE.AmbientLight(0xffffff,0.9));

const light=new THREE.DirectionalLight(0xffffff,1);

light.position.set(2,2,5);

scene.add(light);

function animate(){

  requestAnimationFrame(animate);

  paper.rotation.y += 0.003;

  paper.rotation.x = -0.05;

  renderer.render(scene,camera);

}

animate();