const authApiUrl = '/MiddleService/Auth';

$(document).ready(function () {
  logout()
});

function logout() {
  $('#logoutBtn').click(function (e) {
    e.preventDefault();
    $.ajax({
      url: `${authApiUrl}/logout`,
      type: 'GET',
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