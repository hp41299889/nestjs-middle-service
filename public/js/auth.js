const authApiUrl = '/MiddleService/Auth';

$(document).ready(function () {
  showModal();
  login();
});

function showModal() {
  new bootstrap.Modal($('#loginModal')).show();
}

function login() {
  $('#loginBtn').click(function (e) {
    e.preventDefault();
    console.log('e =', e);
    const account = $('#account').val();
    const password = $('#password').val();
    $.ajax({
      url: `${authApiUrl}/login`,
      type: 'POST',
      data: { account: account, password: password },
      dataType: 'json',
      success: async res => {
        const { status, result } = res;
        if (status != 'redirect') {
          throw 'status is not redirect';
        } else {
          const { url } = result;
          location.replace(url);
        };
      },
      error: async err => {
        console.log(err);
      }
    });
  });
};