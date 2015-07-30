namespace Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Data.HeatEscapeContext>
    {
        private readonly DataSeeder seeder;

        public Configuration()
        {
            this.AutomaticMigrationsEnabled = true;
            this.AutomaticMigrationDataLossAllowed = true;

            this.seeder = new DataSeeder();
        }

        protected override void Seed(Data.HeatEscapeContext context)
        {
            if (!context.Comments.Any() && !context.HighScores.Any() && !context.Ratings.Any())
            {
                foreach (var comment in this.seeder.Comments)
                {
                    context.Comments.Add(comment);
                }

                foreach (var highScore in this.seeder.HighScores)
                {
                    context.HighScores.Add(highScore);
                }

                foreach (var rating in this.seeder.Ratings)
                {
                    context.Ratings.Add(rating);
                }

                context.SaveChanges();
            }
        }
    }
}
