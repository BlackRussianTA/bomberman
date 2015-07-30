namespace Data.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Model;


    public class DataSeeder
    {
        public static Random Rand = new Random();

        public IList<Comment> Comments;

        public IList<HighScore> HighScores;

        public IList<Rating> Ratings;

        public DataSeeder()
        {
            this.Comments = new List<Comment>();

            this.Comments.Add(new Comment() { Text = "<div>This is my favourite game</div>", DateCreated = DateTime.Now });
            this.Comments.Add(new Comment() { Text = "This game is awesome", DateCreated = DateTime.Now });
            this.Comments.Add(new Comment() { Text = "This game is the best ever",Owner="The real player", DateCreated = DateTime.Now });
            this.Comments.Add(new Comment() { Text = "I will give all my salary to donate for this game", Owner = "The nerd", DateCreated = DateTime.Now });
            this.Comments.Add(new Comment() { Text = "This game is at least funnier than my girlfriend, so it is nothing special", Owner = "The DB creator", DateCreated = DateTime.Now });

            this.HighScores = new List<HighScore>();

            this.HighScores.Add(new HighScore(){ Owner="The best player",Points=213213,DateCreated=DateTime.Now});
            this.HighScores.Add(new HighScore(){ Owner="random player",Points=113213,DateCreated=DateTime.Now});
            this.HighScores.Add(new HighScore(){ Owner="the weak player",Points=12,DateCreated=DateTime.Now});

            this.Ratings = new List<Rating>();

            this.Ratings.Add(new Rating() { Score = 4 });
            this.Ratings.Add(new Rating() { Score = 5 });
            this.Ratings.Add(new Rating() { Score = 4 });
            this.Ratings.Add(new Rating() { Score = 5 });
            this.Ratings.Add(new Rating() { Score = 4 });
            this.Ratings.Add(new Rating() { Score = 5 });
            this.Ratings.Add(new Rating() { Score = 3 });
        }
    }
}
