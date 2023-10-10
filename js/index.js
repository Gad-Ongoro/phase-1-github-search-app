function contentLoaded() {
    document.addEventListener("DOMContentLoaded", function(){

        let gitForm = document.querySelector("form#github-form");
        let submitInput = document.querySelector("input[type='submit']");
        let mainDiv = document.querySelector("div#main");
        let searchInput = document.querySelector("form input#search");
        let body = document.querySelector("body");
        body.style.backgroundColor = ("rgb(200, 200, 255)");

        //removes default submit behaviour of the form when submited
        function remDef() {
            gitForm.addEventListener("submit", function(e){
                e.preventDefault();
            })
        };
        remDef();
        //


        //fetch 1 - Users
        function userFetch() {
            fetch(`https://api.github.com/search/users?q=${searchInput.value}`, {
                headers: {
                    Accept: "application/vnd.github.v3+json"
                }
            })
            .then(res => res.json())
            .then(function(data){
                //console.log(data.items);

                function showUserInfo(){

                    submitInput.addEventListener("click", function(){

                        data.items.forEach(user => {
                            console.log(user)
                            let userDiv = document.createElement("div");
                            userDiv.style.listStyleType = "none";
                            userDiv.innerHTML = `

                                <div>
                                    <img src="${user.avatar_url}" style="width:120px; border-radius:50%;">
                                    <p>Username: ${user.login}</p>
                                    <p>ID: ${user.id}</p>
                                    <p><a href=" ${user.html_url}" style="target:_blank; text-decoration:none;"> Profile link </a></p>
                                </div>
                                
                            `;

                            userDiv.addEventListener("click", e => {
                                //console.log(e.target)

                                //repo fetch
                                function userReposFetch() {
                                fetch(`https://api.github.com/users/${searchInput.value}/repos`, {
                                headers: {
                                    Accept: "application/vnd.github.v3+json"
                                    }
                                })
                                .then(res => res.json())
                                .then(function(data2){
                                //console.log(data2)
                                //console.log(searchInput.value)

                                data2.forEach(repo => {
                                console.log(repo)
                                let repoDiv = document.createElement("div");
                                repoDiv.innerHTML = `
                                        <p>${repo.full_name}</p>
                                    `;

                                    userDiv.appendChild(repoDiv);
                                })

                            });

                        }
                        userReposFetch();

                            })
    
                            mainDiv.appendChild(userDiv);
                            
                        });
                    });

                };
                showUserInfo();

            })
        };
        userFetch();



    })

};
contentLoaded();