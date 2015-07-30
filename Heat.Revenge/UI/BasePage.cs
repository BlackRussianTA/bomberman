namespace UI
{
    using System.Web.UI;
    using System.Web.Configuration; 

    using Data;

    public class BasePage : Page
    {
        private readonly HeatEscapeContext data;

        public BasePage()
        {
            this.data = new HeatEscapeContext();
        }

        protected HeatEscapeContext Data
        {
            get { return this.data; }
        }
    }
}