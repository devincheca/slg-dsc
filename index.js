const CONSTANTS = {
  ATTENDING: 'attending',
};

const showAttendingField = () => document.getElementById('attendingField').style.display = 'block';
const hideAttendingField = () => document.getElementById('attendingField').style.display = 'none';

const onFormChange = () => {
  const formData = new FormData(document.getElementById('rsvp'));

  formData.get('answer') === CONSTANTS.ATTENDING
    ? showAttendingField()
    : hideAttendingField();

  updateAttendees();
};

const updateAttendees = () => {
  const list = document.getElementById('attendeesList');
  document.getElementById('attendees').value = Array.from(list.children)
    .map(div => Array.from(div.children)
      .filter(element => element.type = 'text')
      .map(inputDiv => Array.from(inputDiv.children).map(input => input.value))
    )
    .flat()
    .toString();
};

window.onload = () => {
  if (canRsvp() && document.getElementById('rsvpForm')) {
    document.getElementById('rsvpForm').style.display = 'none';
  }
};

const canRsvp = () => new Date('8/1/2024') < new Date();

document.onscroll = () => setTimeout(() => document.getElementById('scrollCarrot').style.display = 'none', 3000);

const addAttendie = () => {
  const list = document.getElementById('attendeesList');
  const index = list.children.length;
  const id = `attendie_${index}`;
  if (index > 0) return showLimitOnePlusOne();

  const newAttendie = document.createElement('div');
  newAttendie.className = 'new-attendie';
  newAttendie.appendChild(getMinusButton(index));

  const inputDiv = document.createElement('div');
  const input = document.createElement('input');
  input.required = true;
  input.className = 'input';
  input.type = 'text';
  input.name = id;
  input.id = id;
  input.placeholder = 'Attendie Name';
  inputDiv.appendChild(input);
  newAttendie.appendChild(inputDiv);

  list.prepend(newAttendie);

  setTimeout(() => document.getElementById(id).focus(), 1);
};
const showLimitOnePlusOne = () => {
  const onePlusOneDiv = document.getElementById('limitPlusOneDiv');
  onePlusOneDiv.style.display = 'block';
  setTimeout(() => onePlusOneDiv.style.display = 'none', 5000);
};

const getMinusButton = index => {
  const div = document.createElement('div');
  const button = document.createElement('button');
  button.className = 'button is-danger';
  button.type = 'button';
  button.innerHTML = 'Remove';
  button.onclick = () => removeAttendie(index);
  div.appendChild(button);
  return div;
};

const removeAttendie = index => {
  const list = document.getElementById('attendeesList');
  Array.from(list.children)
    .filter((_, i) => i === index)
    .map(child => list.removeChild(child));
};

