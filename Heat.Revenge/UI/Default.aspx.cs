using Data;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace UI
{
    public partial class _Default : BasePage
    {
        private const int MAX_WORD_LENGTH = 60;

        public double rating;

        protected void Page_Load(object sender, EventArgs e)
        {
            this.rating = ((double)this.Data.Ratings.Sum(r => r.Score)) / this.Data.Ratings.Count();
            this.DataBind();
        }

        [WebMethod]
        public static string SaveHighScore(string owner, string points)
        {
            var dbContext = new HeatEscapeContext();
            dbContext.HighScores.Add(new HighScore { Owner = owner, Points = double.Parse(points), DateCreated=DateTime.Now });
            dbContext.SaveChanges();          

            return "completed";
        }

        public IQueryable<Comment> Listview_comments_GetData()
        {
            return this.Data.Comments.OrderByDescending(c => c.DateCreated).Take(20);
        }

        protected void Btn_addComment_Click(object sender, EventArgs e)
        {
            this.div_add.Visible = true;
            this.Btn_addComment.Visible = false;
        }

        protected void Btn_Add_Click(object sender, EventArgs e)
        {
            string inputCommentText = this.textbox_comment.Text;
            string inputOwnerText = this.textbox_owner.Text != "" ? this.textbox_owner.Text : null;

            //Validate
            var words = inputCommentText.Split(' ').ToList();

            for (int i = 0; i < words.Count; i++)
            {
                if (words[i].Length > MAX_WORD_LENGTH)
                {
                    words[i] = words[i].Substring(0, MAX_WORD_LENGTH) + "...";
                }
            }

            inputCommentText = String.Join(" ", words);

            if (inputCommentText == null || inputCommentText == "")
            {
                this.ShowValidatingLabel(this.Label_commentEmptyError);
            }
            else
            {
                if (inputOwnerText == null)
                {
                    this.Data.Comments.Add(new Comment { Text = inputCommentText, DateCreated = DateTime.Now });
                }
                else
                {
                    this.Data.Comments.Add(new Comment { Text = inputCommentText, Owner = inputOwnerText, DateCreated = DateTime.Now });
                }

                this.Data.SaveChanges();

                this.ShowValidatingLabel(this.Label_commentAdded);

                this.Btn_addComment.Visible = true;
                this.div_add.Visible = false;
            }

            this.textbox_comment.Text = string.Empty;
            this.textbox_owner.Text = string.Empty;

            this.DataBind();
        }

        protected void Btn_Cancel_Click(object sender, EventArgs e)
        {
            this.textbox_comment.Text = string.Empty;
            this.textbox_owner.Text = string.Empty;

            this.div_add.Visible = false;
            this.Btn_addComment.Visible = true;
        }

        private void ShowValidatingLabel(Label labelId)
        {
            var labelsIds = new Label[] { this.Label_commentAdded, this.Label_commentEmptyError, this.Label_VoteAdded };

            foreach (var currentId in labelsIds)
            {
                currentId.Visible = false;
            }

            labelId.Visible = true;
        }


        public IQueryable<HighScore> Grid_HighScore_GetData()
        {
            return this.Data.HighScores.OrderByDescending(hs => hs.Points);
        }

        protected void Button_Rate_Click(object sender, EventArgs e)
        {
            if (sender == (Button)this.Btn_rating1)
            {
                this.Data.Ratings.Add(new Rating { Score = int.Parse(this.Btn_rating1.Text) });
            }
            else if (sender == (Button)this.Btn_rating2)
            {
                this.Data.Ratings.Add(new Rating { Score = int.Parse(this.Btn_rating2.Text) });
            }
            else if (sender == (Button)this.Btn_rating3)
            {
                this.Data.Ratings.Add(new Rating { Score = int.Parse(this.Btn_rating3.Text) });
            }
            else if (sender == (Button)this.Btn_rating4)
            {
                this.Data.Ratings.Add(new Rating { Score = int.Parse(this.Btn_rating4.Text) });
            }
            else if (sender == (Button)this.Btn_rating5)
            {
                this.Data.Ratings.Add(new Rating { Score = int.Parse(this.Btn_rating5.Text) });
            }
            else
            {
                throw new ArgumentOutOfRangeException("wrong button working with this method");
            }

            this.Data.SaveChanges();

            this.ShowValidatingLabel(this.Label_VoteAdded);
        }
    }
}