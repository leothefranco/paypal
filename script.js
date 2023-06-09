const form = document.getElementById('buyer-form');

document.getElementById('first-name').value = 'Leo';
document.getElementById('last-name').value = 'Franco';
document.getElementById('email').value = 'leofr4nco@gmail.com';
document.getElementById('phone').value = '1234567890';
document.getElementById('country').value = 'United States';
document.getElementById('state').value = 'California';
document.getElementById('zip').value = '12345';
document.getElementById('street').value = '123 Rua St';

function getUserObject() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const street = document.getElementById('street').value;
    const fullName = firstName + ' ' + lastName

    const user = {
       firstName,
       lastName,
       fullName,
       email,
       phone,
       address: {
          country,
          state,
          zip,
          street
       }
    };
 
    return user;
 }
 const user = getUserObject();

 paypal.Buttons({
    createOrder: function(data, actions) {
        const user = getUserObject();
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: '10.00'
            },
            shipping: {
              name: {
                full_name: user.fullName
              },
              address: {
                address_line_1: user.address.street,
                admin_area_2: user.address.state,
                admin_area_1: user.address.country,
                postal_code: user.address.zip,
                country_code: 'US'
              }
            }
          }
        ]
      });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          console.log(details);
          window.location.href = 'thankyou.html?transactionId=' + details.id;
        });
      }      
  }).render('#paypal-button-container');
  
  
 
 

