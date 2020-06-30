async function displayRepos(userName,userPwd){
    var userRepos = document.getElementById("userRepos")
    document.getElementById("reposHeading").style.color = "grey";
    document.getElementById("fName").innerHTML = "  ";
    document.getElementById("closefName").innerHTML = " "
    
    

    const uri = "https://api.github.com/users/" + userName + "/repos";
    let h = new Headers();
    h.append('Accept', 'application/json');
    let encoded = window.btoa(userName + ':' + userPwd);
    let auth = 'Basic' + encoded;
    h.append('Authorization', auth);
    
    let req = new Request(uri,{
        method : 'GET',
        headers : h,
        credentials :'same-origin'
    });
      
    await fetch(req)
    .then((response) => response.json())
    .then((reposList) => {
                            console.log(reposList)
                            for(let i in reposList){
                               userRepos.innerHTML += `<br> ${reposList[i].name} 
                               <a href = "${reposList[i].html_url}" class="link" target="_blank" style = "font-weight : normal; font-size : medium; color : grey;"> View </a><br>`
                                
                            }
                        })
    document.getElementById("reposHeading").onclick = () => window.onload(displayRepos(userName,userPwd));
    document.getElementById("closeRepos").innerHTML = "Go Back"
    document.getElementById("closeRepos").onclick = () => {
        userRepos.innerHTML = " ";
        document.getElementById("closeRepos").innerHTML = " ";
    }
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function displayFollowers(userName,userPwd){
    var fName = document.getElementById("fName")
    document.getElementById("followers").style.color = "grey";
    document.getElementById("userRepos").innerHTML = "  ";
    document.getElementById("closeRepos").innerHTML = " "

    const uri = "https://api.github.com/users/" + userName + "/followers";
    let h = new Headers();
    h.append('Accept', 'application/json');
    let encoded = window.btoa(userName + ':' + userPwd);
    let auth = 'Basic' + encoded;
    h.append('Authorization', auth);
    
    let req = new Request(uri,{
        method : 'GET',
        headers : h,
        credentials :'same-origin'
    });
    
    await fetch(req)
    .then((response) => response.json())
    .then((followers) => {
        console.log(followers)
        for(let i in followers){
            fName.innerHTML += `<br> ${followers[i].login}
            <img src = "${followers[i].avatar_url}" style = "height : 100px; width : 100px;"><br>`
            
        }
    })

    document.getElementById("followers").onclick = () => window.onload(displayFollowers(userName,userPwd));
    document.getElementById("closefName").innerHTML = "Go Back"
    document.getElementById("closefName").onclick = () => {
        fName.innerHTML = " ";
        document.getElementById("closefName").innerHTML = " "}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var searchForm = document.getElementById("searchForm");
var form = document.getElementById("myForm");

form.addEventListener("submit", function accountDisplay(e){
    e.preventDefault();

    document.getElementById("userRepos").innerHTML = "  ";
    document.getElementById("fName").innerHTML = "  ";
    document.getElementById("userAvatar").innerHTML = " ";
    document.getElementById("reposHeading").innerHTML = " ";


    var input = document.getElementById("userName").value;
    var userName = input.split(" ").join("")
    var userPwd = document.getElementById("userPwd").value;
    const uri = "https://api.github.com/users/"+userName;
    let h = new Headers();
    h.append('Accept', 'application/json');
    let encoded = window.btoa(userName + ':' + userPwd);
    let auth = 'Basic' + encoded;
    h.append('Authorization', auth);
    
    let req = new Request(uri,{
        method : 'GET',
        headers : h,
        credentials :'same-origin'
    });
    
    fetch(req)
    .then((response) => {
        if(response.ok){
            return response.json()
        } else{
            alert("Invalid username")
            throw new Error('Bad HTTP stuff');
        }
    })
    .then((data) =>{
        console.log(data)

        form.innerHTML = " ";

/////////////////////////////////////////////////////////////search user///////////////////////////////////////////////////////////////       
        searchForm.innerHTML = `
        <div class="form-group row">
            <label class="control-label col-lg-5 col-md-5 col-sm-5 col-xs-5" for="searchBtn">Search User :  </label> 
            <input type="text" class="form-control col-lg-6 col-md-6 col-sm-6 col-xs-6 " id = "searchName" placeholder="Enter Username" >
                   
        </div>
        <button type="submit" class="btn btn-info form-control" id = "searchBtn">View Profile</button>
         `;

         searchForm.addEventListener("submit", async function SearchDisplay(s){
            s.preventDefault();
            var searchName = document.getElementById("searchName").value;
            await fetch("https://api.github.com/users/"+searchName)
            .then((obj) => {
                if(obj.ok){ return obj.json()}
                else{
                    alert("User does not exist")
                    }
            })
            .then((searchResult) => {
                window.open(searchResult.html_url)})
        
        })
////////////////////////////////1///////////////////////////////////////////////////////////////////////////////////////////////////////        

        var userAvatar = document.getElementById("userAvatar")
        userAvatar.src = data.avatar_url;
        userAvatar.style.height = "200px";
        userAvatar.style.width = "200px"

        var reposHeading = document.getElementById("reposHeading")
        reposHeading.innerHTML = "Repositories"
        reposHeading.onclick = () => displayRepos(userName,userPwd)       
        reposHeading.style.cursor = "pointer"
     

       
        
        var followers = document.getElementById("followers")
        followers.innerHTML = "Followers"
        followers.onclick = () => displayFollowers(userName,userPwd)       
        followers.style.cursor = "pointer"

        document.getElementById("userId").innerHTML = data.login;
        document.getElementById("viewProfile").innerHTML = "View Profile"
        document.getElementById("viewProfile").href = data.html_url;
        
    })
})
