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

