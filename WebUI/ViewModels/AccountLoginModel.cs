#region Imports

using System.ComponentModel.DataAnnotations;

#endregion

namespace Web.ViewModels
{
    public class AccountLoginModel
    {
        /// <summary>
        ///     Gets or sets the email.
        /// </summary>
        /// <value>The email.</value>
        [Required]
        public string Email { get; set; }

        /// <summary>
        ///     Gets or sets the password.
        /// </summary>
        /// <value>The password.</value>
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public int? SchoolID { get; set; }

        /// <summary>
        ///     Gets or sets the return URL.
        /// </summary>
        /// <value>The return URL.</value>
        public string ReturnUrl { get; set; }

        /// <summary>
        ///     Gets or sets a value indicating whether [remember me].
        /// </summary>
        /// <value><c>true</c> if [remember me]; otherwise, <c>false</c>.</value>
        public bool RememberMe { get; set; }
    }
}