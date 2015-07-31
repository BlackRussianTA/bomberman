<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Admin.aspx.cs" Inherits="UI.Delete" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <hr />
    <hr />

    <asp:UpdatePanel runat="server">
        <ContentTemplate>
            <asp:GridView
                runat="server"
                ID="Grid_Comments"
                DataKeyNames="Id"
                ItemType="Model.Comment"
                SelectMethod="Grid_Comments_GetData"
                AutoGenerateColumns="false"
                OnRowDeleting="Grid_Comments_RowDeleting"
                DeleteMethod="Grid_Comments_DeleteItem"
                PageSize="3">
                <Columns>
                    <asp:BoundField DataField="Text" HeaderText="Comment" />
                    <asp:BoundField DataField="Owner" HeaderText="Owner" />
                    <asp:CommandField ShowDeleteButton="true" HeaderText="Delete" />
                </Columns>
            </asp:GridView>

            <hr />

             <asp:GridView
                runat="server"
                ID="Grid_HighScore"
                DataKeyNames="Id"
                ItemType="Model.HighScore"
                SelectMethod="HighScore_GetData"
                AutoGenerateColumns="false"
                OnRowDeleting="Grid_HighScore_RowDeleting"
                DeleteMethod="Grid_HighScore_DeleteItem"
                PageSize="3">
                <Columns>
                    <asp:BoundField DataField="Owner" HeaderText="Owner" />
                    <asp:BoundField DataField="Points" HeaderText="Points" />
                    <asp:CommandField ShowDeleteButton="true" HeaderText="Delete" />
                </Columns>
            </asp:GridView>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
