namespace Model
{
    using System;
    using System.ComponentModel.DataAnnotations;


    public class HighScore
    {
        public HighScore()
        {
            this.Owner = "Anonymous";
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public double Points { get; set; }

        public string Owner { get; set; }

        [Required(ErrorMessage = "Date time cannot be empty")]
        public DateTime DateCreated { get; set; }
    }
}
