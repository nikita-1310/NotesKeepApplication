const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.popup-box'),
popupTitle = popupBox.querySelector('header p'),
closeIcon = popupBox.querySelector('header i'),
titleTag = document.getElementById('inputText'),
descTag = document.getElementById('text'),
addBtn = popupBox.querySelector('button')
;

// Change theme

let changeTheme = document.getElementById('icon');
changeTheme.addEventListener('click',()=>{
    document.body.classList.toggle("dark-theme")
})

// Speech recognition
let inputResult = document.getElementById('inputText');
let descResult = document.getElementById('text');
        let SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition,
        recognition;
        function voice(){
            recognition = new SpeechRecognition();
            recognition.interimResults = true;
            recognition.lang="en-GB";
            recognition.start();
            document.getElementById('listen').style.display='flex';
            recognition.onresult= (event)=>{
                console.log(event)
                const getValue = event.results[0][0].transcript;
                descResult.innerHTML += " "+ getValue;
            }    
        }
        function inputVoice(){
            recognition = new SpeechRecognition();
            recognition.interimResults = true;
            recognition.lang="en-GB";
            recognition.start();
            document.getElementById('listen').style.display='flex';
            recognition.onresult= (event)=>{
                console.log(event)
                const getValue = event.results[0][0].transcript;
                inputResult.innerHTML += " "+ getValue;
            }    
        }


const months = ['January','February','March','April','May','June','July','August','September','October','November','december']

// getting locat storage notes if exist and parsing them to object else parsing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isupdate = false, updateId;

addBox.addEventListener("click", ()=>{
    titleTag.focus();
    popupBox.classList.add('show') 
})

closeIcon.addEventListener("click", ()=>{
    isupdate = false;
    titleTag.value="";
    descTag.value="";
    addBtn.innerText = 'Add a Note';
    popupTitle.innerText = 'Add a new Note';
    popupBox.classList.remove('show')
})

const showNotes = ()=>{
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index) =>{
        let liTag = `<li class="note">
                    <div class="details">
                        <p>${note.title}</p>
                        <span>${note.description}</span>
                    </div>
                    <div class="bottom-content">
                        <span>${note.date}</span>
                        <div class="settings">
                            <i onclick='showMenu(this)' class="fa fa-ellipsis-h"></i>
                            <ul class="menu">
                                <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="fa fa-edit"></i>Edit</li>
                                <li onclick="deleteNote(${index})"><i class="fa fa-trash-o"></i>Delete</li>
                            </ul>
                        </div>
                    </div>
                </li>`;

        addBox.insertAdjacentHTML('afterend', liTag);
    });
}
showNotes();

const showMenu =(element) =>{
    element.parentElement.classList.add('show');
    document.addEventListener('click', e =>{
        // removing show class from settings menu on document click
        if(e.target.tagName !="I" || e.target != element){
            element.parentElement.classList.remove('show');
        }
    })
}

const deleteNote = (noteId)=>{
    let confirmDel = confirm('Are you sure want to delete this note ?');
    if(!confirmDel) return
    notes.splice(noteId, 1);
    // saving update notes on local storage
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc){
    isupdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value=title;
    descTag.value=desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
}

addBtn.addEventListener("click", e=>{
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc){
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title : noteTitle, description : noteDesc,
            date : `${month} ${day}, ${year}`
        }
        if(!isupdate){
                notes.push(noteInfo); // add a new note in notes
            }
        else{
            isupdate = false;
            notes[updateId] = noteInfo; // updating specified note
        }
        localStorage.setItem('notes', JSON.stringify(notes));  // saving notes to local storage  ----- data will be store in object form [ object object ] we have to convert in json convert object into string
        closeIcon.click();
        showNotes();
    }
    
})

