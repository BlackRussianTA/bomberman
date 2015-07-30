using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace UI
{
    public partial class Delete : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }


        public IQueryable<Comment> Grid_Comments_GetData()
        {
            return  this.Data.Comments.OrderByDescending(c=>c.DateCreated);
        }

        protected void Grid_Comments_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            int idToDelete = Convert.ToInt32(this.Grid_Comments.DataKeys[e.RowIndex].Value);

            Comment commentToDelete = this.Data.Comments.FirstOrDefault(c => c.Id == idToDelete);

            this.Data.Comments.Remove(commentToDelete);
            this.Data.SaveChanges();

            this.DataBind();
        }

        // The id parameter name should match the DataKeyNames value set on the control
        public void Grid_Comments_DeleteItem(int id)
        {

        }
        public IQueryable<HighScore> HighScore_GetData()
        {
            return this.Data.HighScores.OrderByDescending(c => c.Points);
        }

        protected void Grid_HighScore_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            int idToDelete = Convert.ToInt32(this.Grid_HighScore.DataKeys[e.RowIndex].Value);

            HighScore scoreToDelete = this.Data.HighScores.FirstOrDefault(c => c.Id == idToDelete);

            this.Data.HighScores.Remove(scoreToDelete);
            this.Data.SaveChanges();

            this.DataBind();
        }

        // The id parameter name should match the DataKeyNames value set on the control
        public void Grid_HighScore_DeleteItem(int id)
        {

        }
    }
}