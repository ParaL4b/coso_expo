import { saveComent, onGetComment, getPhoto, storage} from './ConexionDB.js'
import { ref } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js';

const user = localStorage.getItem('usuario');
const email = localStorage.getItem('email');


const Comentarioshtml = document.querySelector('#Comentarios');

const EnviarComment = document.querySelector('#EnviarComment');


window.addEventListener('DOMContentLoaded', async () => {
    sesionActive();
    onGetComment((querySnapshot) => {
        let html = '';
        querySnapshot.forEach((doc) => {
            let userName = `${doc.data().user}`;
            if( userName != user){
                html += `
                    <ion-row >
                        <ion-col>
                            <ion-card color="tertiary">
                                <ion-card-header>
                                    <ion-card-title>
                                        <ion-chip>
                                            <ion-avatar>
                                                <img alt="Silhouette of a person's head" src="${doc.data().photo}" />
                                            </ion-avatar>
                                            <ion-label>${doc.data().user}</ion-label>
                                        </ion-chip>   
                                    </ion-card-title>
                                </ion-card-header>
                                <ion-card-content> 
                                    ${doc.data().comment} 
                                </ion-card-content>
                            </ion-card>  
                        </ion-col>
                    </ion-row> <br>  
                `
            } else {
                html += `
                    <ion-row >
                        <ion-col>
                            <ion-card color="success">
                                <ion-card-header>
                                    <ion-card-title>
                                        <ion-chip>
                                            <ion-avatar>
                                                <img alt="Silhouette of a person's head" src="${doc.data().photo}" />
                                            </ion-avatar>
                                            <ion-label> ${doc.data().user}</ion-label>
                                        </ion-chip>   
                                    </ion-card-title>
                                </ion-card-header>
                                <ion-card-content> 
                                    ${doc.data().comment} 
                                </ion-card-content>
                            </ion-card>  
                        </ion-col>
                    </ion-row> <br>  
                `
            }
            
        });
        Comentarioshtml.innerHTML = html;
    })
    

})

async function FotoPerfil(){
    const url = ref(storage, localStorage.getItem('photo'))
    let photo = await getPhoto(url);
    return photo;
}

function sesionActive(){
    if(localStorage.getItem('active') != '0'){
        location.href = './pages/inicio de sesion/InicioSesion.html';
    }
        
}

EnviarComment.addEventListener('click', async () => {
    const comment = document.querySelector('#ComentarioInput');
    const URLPhoto = await FotoPerfil();
    if(comment.value.trim().length != 0){
        saveComent(user, email, comment.value, URLPhoto);
        comment.value = "";
    }
    else presentAlert();    
})



document.querySelector('#avatar').addEventListener('click',() => {
    
    localStorage.setItem('active', '0');
    location.href = './pages/inicio de sesion/InicioSesion.html';
    
})

async function presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Alerta';
    alert.subHeader = 'comentario vacio';
    alert.message = 'No puedes enviar en comentario vacio';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }
