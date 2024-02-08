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
};

window.onload = () => {
  if (canRsvp()) document.getElementById('rsvpForm').style.display = 'none';
};

const canRsvp = () => new Date('8/1/2024') < new Date();

document.onscroll = () => setTimeout(() => document.getElementById('scrollCarrot').style.display = 'none', 3000);

const addAttendie = () => {
  const list = document.getElementById('attendeesList');
  const index = list.children.length;

  const newAttendie = document.createElement('div');
  newAttendie.className = 'new-attendie';
  newAttendie.appendChild(getMinusButton(index));

  const inputDiv = document.createElement('div');
  const input = document.createElement('input');
  input.required = true;
  input.className = 'input';
  input.type = 'text';
  input.name = `attendie_${index}`;
  input.placeholder = 'Attendie Name';
  inputDiv.appendChild(input);
  newAttendie.appendChild(inputDiv);

  list.prepend(newAttendie);
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

