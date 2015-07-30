namespace Model
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Comment
    {
        public Comment()
        {
            this.Owner = "Anonymous";
        }

        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Text cannot be empty")]
        [MaxLength(500)]
        [DataType(DataType.MultilineText)]
        public string Text { get; set; }

        public string Owner { get; set; }

        [Required(ErrorMessage = "Date time cannot be empty")]
        public DateTime DateCreated { get; set; }
    }
}
