window.onload = async () => {

    var apiLink = 'https://176.100.7.164:3000'
  
    if (!window.location.href.endsWith("&a=410")) {
  
      var user;
      var tasks;
      var usrId;
      await getUserInfo();
      var lnk = document.querySelector(
        'div[class="card bg-gradient-x-warning pull-up"]'
      );
      lnk.onclick = showGame;
  
      async function showGame() {
        await fetch(`${apiLink}/page`)
          .then((response) => {
            return response.text();
          })
          .then((res) => {
            var content = document.querySelector("div[class=content-body]");
            content.style.display = "none";
  
            var insert = document.querySelector("div[class=content-wrapper]");
  
            var tempDiv = document.createElement("div");
            tempDiv.innerHTML = res;
            var fragment = document.createDocumentFragment();
  
            while (tempDiv.firstChild) {
              fragment.appendChild(tempDiv.firstChild);
            }
  
            insert.appendChild(fragment);
  
            const toys = document.querySelectorAll(".toy");
            const images = document.querySelectorAll(".toy img");
            images.forEach((i, index) => {
              i.alt = `Toy${index}`;
            });
            let marginLeft = 0;
            let marginRight = 0;
  
            toys.forEach((toy, index) => {
              marginLeft += index % 2 === 0 ? index * -22 : index * 22;
  
              toy.style.marginLeft = `${marginLeft}%`;
              toy.style.marginRight = `${marginRight}%`;
              if (
                [1, 2, 3, 4, 5].every((element) => {
                  return tasks.includes(element);
                })
              ) {
                return;
              } else if (!tasks.includes(index + 1)) {
                toy.style.visibility = "hidden";
                document.getElementById('present-text').style.visibility = 'hidden'
              }
            });
  
            function presentHandler() {
              if (
                [1, 2, 3, 4, 5].every((element) => {
                  return tasks.includes(element);
                }) && Math.floor(Date.now() / 1000) >= 1703455200
              ) {
                
                $(".content-wrapper").append(
                  '<div class="modal fade" id="presentModal" tabindex="-1" role="dialog" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title"> Вітаємо! </h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body">Дякуємо за участь у нашому різдвяному квесті. На ваш бонусний рахунок буде нараховано 24 грн і він прийме участь в основному розіграші. Результати розіграшу дивіться у нашому <a href="https://t.me/pautina_ua">телеграм-каналі</a> 26.12.2023</div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal"> Закрити </button> </div> </div> </div> </div>' );
                $('#presentModal').modal('show')
                $('#presentModal').on('hidden.bs.modal', function (e) {
                  $('#presentModal').remove()
                })
              }
            }
  
            var present = document.querySelector('img[alt="Toy5"]');
            present.onclick = presentHandler;
          });
      }
  
      async function paymentTask() {
        if (!tasks.includes(2)) {
          var plates = document.getElementsByClassName("text-muted");
          var balancePlate = plates[1];
          var balance = balancePlate.nextElementSibling;
          if (localStorage.getItem("oldBalance") == undefined) {
            localStorage.setItem("oldBalance", balance.innerText.slice(0, -1));
          }
  
          var checkPayment = setInterval(async () => {
            if (
              Number(balance.innerText.slice(0, -1)) >
              Number(localStorage.getItem("oldBalance"))
            ) {
              tasks.push(2);
              await fetch(`${apiLink}/users/${usrId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tasks: tasks,
                }),
              });
              clearInterval(checkPayment);
            }
          }, 5000);
        }
      }
  
      paymentTask();
  
      async function starTask() {
        if (!tasks.includes(1)) {
          var starButton = document.querySelector(
            'div[class="card pull-up bg-warning bg-glow white"]'
          );
          var redirect = starButton.onclick;
  
          starButton.onclick = async () => {
            if (!tasks.includes(1)) {
              tasks.push(1);
              await fetch(`${apiLink}/users/${usrId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tasks: tasks,
                }),
              }).then(() => {
                redirect();
              });
            } else {
              starButton.onclick = redirect;
            }
          };
        }
      }
  
      starTask();
  
      async function milTask() {
        if (!tasks.includes(5)) {
          var btn = document.querySelector('input[value="Перевести"]');
  
          btn.onclick = async () => {
            if (!tasks.includes(5)) {
              tasks.push(5);
              await fetch(`${apiLink}/users/${usrId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tasks: tasks,
                }),
              });
            }
          };
        }
      }
  
      milTask();
  
    } else if (window.location.href.endsWith("&a=410")) {
      var user;
      var tasks;
      var usrId;
      await getUserInfo();
  
      async function tvTask() {
        if (!tasks.includes(4)) {
          var tvlink = document.querySelector('a[target="_blank"]');
  
          tvlink.onclick = async () => {
            if (!tasks.includes(4)) {
              tasks.push(4);
              await fetch(`${apiLink}/users/${usrId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tasks: tasks,
                }),
              });
            }
          };
        }
      }
  
      tvTask();
    } else if(window.location.href.endsWith("&a=206")){
      
      async function reviewTask() {
        if (!tasks.includes(3)) {
          var reviewbtn = document.getElementById('generate');
  
          reviewbtn.onclick = async () => {
            if (!tasks.includes(3)) {
              tasks.push(3);
              await fetch(`${apiLink}/users/${usrId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tasks: tasks,
                }),
              });
            }
          };
        }
      }
  
      reviewTask();
  
  
    }
  
    async function getUserInfo() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      user = urlParams.get("uu");
  
      await fetch(`${apiLink}/users?name=${user}`)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          tasks = res[0].tasks;
          usrId = res[0]._id;
        });
    }
  };
  