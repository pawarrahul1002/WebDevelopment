console.log("main.js loaded");

function deleteProduct(id) {
    const result = confirm(
      'Are you sure you want to delete this product ?'
    );
    if (result) {
      console.log("")
      fetch('/delete-product/' + id, {
        method: 'POST',
      }).then((res) => {
        if (res.ok) {
          window.location.href = "/";
          // location.reload();
        }
      });
    }
  }
  