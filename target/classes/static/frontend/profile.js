const user =
localStorage.getItem("currentUser");

document.getElementById("profileName").innerText =
user || "Admin";

document.getElementById("profileRole").innerText =
"Role : Inventory Manager";

document.getElementById("profileStatus").innerText =
"Status : Active";

/* Saved Image Load */

const savedImage =
localStorage.getItem("profileImage");

if(savedImage)
{
    document.getElementById(
        "profileImage"
    ).src = savedImage;
}

/* Upload New Image */

document.getElementById(
    "imageUpload"
).addEventListener(
    "change",
    function(event)
    {
        const file =
        event.target.files[0];

        if(file)
        {
            const reader =
            new FileReader();

            reader.onload =
            function(e)
            {
                document.getElementById(
                    "profileImage"
                ).src =
                e.target.result;

                localStorage.setItem(
                    "profileImage",
                    e.target.result
                );
            };

            reader.readAsDataURL(
                file
            );
        }
    }
);