
    const button = document.querySelector('button');
    const input = document.querySelectorAll('input');

 
    button.addEventListener('click', (e)=>{
        e.preventDefault();
        console.log(window);
  const formValue = {
      name: input[0].value,
      age: input[1].value,
      city: input[2].value,
      street: input[3].value,
      streetNumber: input[4].value,
      email: input[5].value,
  }; 
   console.log(formValue);
    

        localStorage.setItem('key', JSON.stringify(formValue));

       const localSt = JSON.parse(localStorage.getItem('key'));
       console.log(localSt);

       window.open('blank.html', '_blank');
       document.body.innerHTML = `<div>${localSt}</div>`;

    })
