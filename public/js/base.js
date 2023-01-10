const authApiUrl = '/MiddleService/Auth';

$(document).ready(function () {
  logout()
});

function logout() {
  $('#logoutBtn').click(function (e) {
    e.preventDefault();
    console.log('e =', e);

    $.ajax({
      url: `${authApiUrl}/logout`,
      type: 'GET',
      dataType: 'json',
      success: async res => {
        const { status, result } = res;
        if (status != 'success') {
          throw 'status is not success';
        } else {
          const { url } = result;
          location.replace(url);
        };
      },
      error: async err => {
        console.log(err);
      }

    });
    //   fetch(`${authApiUrl}/logout`, {
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     method: 'GET',
    //     redirect: "follow"
    //   })
    //     .then(res => res.redirected && (location.href = res.url))
    //     .catch(err => {
    //       console.log('err =', err)
    //     })
    //   sessionStorage.clear();
  });
};