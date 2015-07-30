namespace Model
{
    using System.ComponentModel.DataAnnotations;

    public class Rating
    {
        [Key]
        public int Id { get; set; }

        public int Score { get; set; }
    }
}
