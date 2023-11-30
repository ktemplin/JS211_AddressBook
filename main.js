let usersData; 

const fetchUsers = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=10&noinfo', {
      method: 'GET',
      contentType: 'application/json'
    });

    if (response.ok) {
      usersData = await response.json();
      console.log(usersData)
      displayUsers();
    }
  } catch (error) {
    console.error(error);
  }
};

const displayUsers = () => {
  const usersContainer = document.getElementById('usersContainer');
  const numCards = calculateNumCards();

  usersContainer.innerHTML = ''; 

  for (let i = 0; i < numCards; i++) {
    const userCard = createUserCard(usersData.results[i]);
    usersContainer.appendChild(userCard);
  }
};

const createUserCard = (user) => {
  const card = document.createElement('div');
  card.classList.add('user-card');

  const avatar = document.createElement('img');
  avatar.src = user.picture.medium;
  avatar.alt = 'User Avatar';
  card.appendChild(avatar);

  const name = document.createElement('p');
  name.textContent = `${user.name.first} ${user.name.last}`;
  card.appendChild(name);

  const email = document.createElement('p');
  email.textContent = user.email;
  card.appendChild(email);

  const phone = document.createElement('p');
  phone.textContent = user.phone;
  card.appendChild(phone);

  return card;
};

const calculateNumCards = () => {
  if (window.innerWidth >= 1024) {
    return 10; 
    // Display 10 cards for larger screens
  } else if (window.innerWidth >= 768) {
    return 8; 
    // Display 8 cards for medium-sized screens
  } else {
    return 5; 
    // Display a minimum of 5 cards for smaller screens
  }
};

// document.addEventListener('load', () => {
//   fetchUsers();
// });

document.addEventListener('DOMContentLoaded', () => {
  fetchUsers();
});

window.addEventListener('resize', displayUsers);
