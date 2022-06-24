

function waitforme(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    });
}


async function dy_heading(){

	let heading_ele=document.getElementById('heading1');
	let head_cont=document.getElementById('head_cont');
	let icon=document.getElementById('icon');

	let s="Welcome to Boarding Section...";
	let i=0;
	let n=s.length;
	let res="";
	while(i<n){
			res+=s[i];
			await waitforme(80);
			heading_ele.textContent=res;
		i++;
	}
	console.log(heading_ele);
	icon.classList.add('fa','fa-paper-plane');

	
	
	console.log(res);
}


let date_input=document.getElementById('curr_date');
console.log(date_input.value);
let details_btn=document.getElementById('details');
details_btn.addEventListener('click',function(){

	
	let curr_date_passengers=[];
	let count_of_passengers=0;
		
	for(x of objectofpassengers){

		if(x.date==date_input.value){
			curr_date_passengers.push(x);
			count_of_passengers++;
		}
	}
	let main_container=document.getElementById('details-cont');
	let details_cont=document.createElement('div');
	details_cont.classList.add('mt-5');

	main_container.textContent="";
	


	details_cont.classList.add('row');
	details_cont.classList.add('text-center');




	

	let seq_head=document.createElement('p');
	seq_head.classList.add('col-2');
	seq_head.textContent='Sequence Number';
	details_cont.appendChild(seq_head);


	let booking_id_head=document.createElement('p');
	booking_id_head.textContent='Booking Id';
	booking_id_head.classList.add('col-3');
	details_cont.appendChild(booking_id_head);
	

	let seat_numbers_head=document.createElement('p');
	seat_numbers_head.textContent='Seat Numbers';
	seat_numbers_head.classList.add('col-2');
	details_cont.appendChild(seat_numbers_head);

	let mobile_head=document.createElement('p');
	mobile_head.textContent='Mobile Number';
	mobile_head.classList.add('col-3');
	details_cont.appendChild(mobile_head);

	let arrival_status_head=document.createElement('p');
	arrival_status_head.textContent="Arrival Status";
	arrival_status_head.classList.add('col-2');
	details_cont.appendChild(arrival_status_head)

	main_container.appendChild(details_cont);

	
	if(count_of_passengers==0){


		details_cont.textContent="";
		let msg=document.createElement('p');
		msg.textContent="No Arrivals";
		msg.classList.add('msg');
		details_cont.appendChild(msg);
	}else{

		

		for(let x of curr_date_passengers){
			for(let i=0;i<x.seats.length;i++){
				x[i]=parseInt(x[i]);
			}
		}
		console.log(curr_date_passengers);

		curr_date_passengers.sort(function(a,b){

			let i=0,j=0
			while(i<a.seats.length && j<b.seats.length){

				if(a.seats[i]<b.seats[j]){
					return 1;
				}else if(a.seats[i]>b.seats[j]){
					return -1;
				}
			}
			if(i<a.seats.length){

				return -1;
			}
			return 1;
			
		});

		console.log("after sort");
		console.log(curr_date_passengers);

		

		let c=1;


		for(x of curr_date_passengers){

			details_cont=document.createElement('div');
			details_cont.classList.add('row');
			details_cont.classList.add('text-center');

			seq_head=document.createElement('p');
			seq_head.classList.add('col-2');
			seq_head.textContent=c;c++;
			details_cont.appendChild(seq_head);

			booking_id_head=document.createElement('p');
			booking_id_head.textContent=x.bookId;
			booking_id_head.classList.add('col-3');
			details_cont.appendChild(booking_id_head);
		
			seat_numbers_head=document.createElement('div');
			seat_numbers_head.classList.add('col-2');
			details_cont.appendChild(seat_numbers_head);


			let seats_nums=document.createElement('div');
			seats_nums.classList.add('d-flex','flex-column','justify-content-center');
			for(y of x.seats){

				let t=document.createElement('p');
				t.textContent=y;
				seats_nums.appendChild(t);
			}

			seat_numbers_head.appendChild(seats_nums);

			mobile_head=document.createElement('p');
			mobile_head.textContent=x.mobile;
			mobile_head.classList.add('col-3');
			details_cont.appendChild(mobile_head);

			let but=document.createElement('button');
			but.textContent='Arrived';
			but.classList.add('col-2','button');
			details_cont.appendChild(but);

			

			main_container.appendChild(details_cont);
			let hor=document.createElement('hr');
			main_container.appendChild(hor)

			


		}


	}






});
const objectofpassengers = [];
let indexofseats = [];
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.d-flex .seat');
const count = document.getElementById('count');
const bookbtn = document.querySelector('.bookingbtn');
const nameElement = document.getElementById('#name');
const dateElement = document.getElementById('#date');
const mobilElement = document.getElementById('#mobile');
const seatCheckingBtn = document.querySelector('.available');
console.log(seatCheckingBtn);
console.log(seatCheckingBtn);
console.log(dateElement.value);
console.log(mobilElement);

function getRandomArbitrary(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
}
seatCheckingBtn.addEventListener('click', function() {
	
	if(nameElement.value==""){
		alert("Fill all the fields"
		);return;
	}

	let p=mobilElement.value;
	console.log(p);
	if(p.length<10 || p.length>10){

		alert("enter valid mobile number.1");
		return;
	}

	for(let i=0;i<p.length;i++){
		if(p[i]-'0'<0 || p[i]-'0'>57){

			alert('enter valid mobile number.2 '+p[i]-'0');return;
		}
	}
	

    let listofSeats = [];
    seats.forEach(function(seat2) {
        seat2.classList.remove('selected');
        seat2.classList.remove('occupied');
    });
    if (dateElement.value !== '') {
        objectofpassengers.forEach(function(obj1) {
            if (obj1.date === dateElement.value) {
                obj1.seats.forEach(function(item) {
                    listofSeats.push(item);
                });
            }
        });
        seats.forEach(function(seat1, index) {
            if (listofSeats.indexOf(index) > -1) {
                seat1.classList.add('occupied');
            }
        });
    } else {
        alert("Enter Date For Checking Availability");
    }
});

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.d-flex .seat.selected');
    // console.log(selectedSeats);
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    indexofseats = [...seatsIndex];
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    if (selectedSeatsCount > 6) {
        alert("you can't book more that 6 tickets");
        selectedSeats[selectedSeats.length - 1].classList.remove('selected');
    }
    count.innerText = selectedSeatsCount;
}

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});
//buttonstyles
bookbtn.addEventListener('mouseenter', function() {
    bookbtn.style.backgroundColor = "black";
    bookbtn.style.color = 'white';
    bookbtn.style.borderColor = 'black';
    // alert('Do you want to confirm');

});
bookbtn.addEventListener('mouseout', function() {
    bookbtn.style.backgroundColor = '#606060';
    bookbtn.style.color = 'white';
});
bookbtn.addEventListener('click', function() {
    if (mobilElement.value === '' || nameElement.value === '' || dateElement.value == '') {
        alert('You have to fill all fields all are mandatory');
        return;
    }

    let objofpass = {
        nameOfTravelar: nameElement.value,
        date: dateElement.value,
        seats: [...indexofseats],
        mobile: mobilElement.value,
        bookId: getRandomArbitrary(1234324, 999999999),
    };

    objectofpassengers.push(objofpass);
    console.log(objectofpassengers);
    alert("Your Booking is Confirmed and Happy Journey");
    seats.forEach(function(seat) {
        seat.classList.remove('selected');
        seat.classList.remove('occupied');
    });
    // seats.
    dateElement.value = '';
    nameElement.value = '';
    mobilElement.value = '';
    count.innerText = 0;

});
// intial count and total
console.log(objectofpassengers);
updateSelectedCount();


let x=document.querySelector('.cont-1');
let y=document.querySelector('.cont-2');
let go_tobtn=document.querySelector(".button1");
go_tobtn.addEventListener('click',function(){

	x.classList.add('d-none');

	y.classList.remove('d-none');
	dy_heading();
	console.log(y);


});





