const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

let ticketPrice = +movieSelect.value; // + is used to convert into Number

// Update Selected seat count and price
function updateSelectedCount(){
    const selectedSeat = document.querySelectorAll('.row .seat.selected')
    
    // Set Seat Data to local storage
    const seatIndex = [...selectedSeat].map( seat => [...seats].indexOf(seat))
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex))
    
    count.innerText = selectedSeat.length
    total.innerText = selectedSeat.length*ticketPrice
}

// Get Data From Local storage and populate
function populateData(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'))
    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1)
                seat.classList.add('selected')
        })
    }
    if(selectedMovie != null)
        movieSelect.selectedIndex = selectedMovie[0]
  
}

populateData();

// Set Movie Index and Price
function setMovieData(index, price){
    localStorage.setItem('selectedMovie', JSON.stringify([index,price]))
}

// Select Movie
movieSelect.addEventListener('change', e => {
    ticketPrice = +movieSelect.value
    setMovieData(e.target.selectedIndex, +e.target.value)
    updateSelectedCount()
})

// Select Seat
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateSelectedCount()  
    }
})

// Initial Count
updateSelectedCount();