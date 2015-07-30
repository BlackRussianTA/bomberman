namespace Data
{
    using Data.Migrations;
    using System.Data.Entity;

    using Model;

    public class HeatEscapeContext:DbContext
    {
        public HeatEscapeContext()
        {
           Database.SetInitializer(new MigrateDatabaseToLatestVersion<HeatEscapeContext, Configuration>());
        }

        public IDbSet<Comment> Comments { get; set; }

        public IDbSet<HighScore> HighScores { get; set; }

        public IDbSet<Rating> Ratings { get; set; }
    }
}
