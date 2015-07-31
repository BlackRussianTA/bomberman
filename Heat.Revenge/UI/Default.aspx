<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="UI._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Heat Revenge</h1>

    <div id="canvasContainer">
    </div>

    <div id="gameContainer">
        <div id="ScreenWrapper">
            <div id="startScreen" class="hidden">
                <h1 class="h1">Heat Revenge</h1>
                <button type="button" id="btn_start" class="button">Start</button>
                <button type='button' id="btn_howToPlay" class="button">How To Play</button>
                <button type='button' id="btn_about" class="button"><a href="About.aspx" id="ancher_about">About</a></button>
            </div>

            <div id="aboutScreen" class="hidden">
                <p class="p">The best game ever...</p>
                <button type="button" class="back button" id="btn_backFromAbout">Back</button>
            </div>

            <div id="howToPlayScreen" class="hidden">
                <p class="p">Use arrows or ...</p>
                <ul class="ul">
                    <li class="li">W for UP</li>
                    <li class="li">A for LEFT</li>
                    <li class="li">D for RIGHT</li>
                    <li class="li">S for DOWN</li>
                    <li class="li">B for BOMB</li>
                </ul>
                <button type="button" class="back button" id="btn_backFromHowToPlay">Back</button>
            </div>
            <div id="endScreen" class="hidden">
                <p>
                    <span class="span">Your score:
                            <label id="lbl_score"></label>
                    </span>
                </p>
                <p>
                    <span class="span">Username</span><br>
                    <input type="text" name="userName" id="input_user" class="input" />
                </p>
                <p>
                    <button id="btn_newGame" class="button">Start new game</button>
                </p>
                <p>
                    <button id="btn_submit" class="button">Submit</button>
                </p>
            </div>
        </div>
        <div id="svg-container"></div>
        <div id="kinetic-canvas"></div>
    </div>

    <hr />

    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-2 rating">Rate Us! </div>
        <asp:UpdatePanel runat="server">
            <ContentTemplate>
                <div class="col-md-3">
                    <asp:Button runat="server" ID="Btn_rating1" Text="1" CssClass="btn btn-primary" OnClick="Button_Rate_Click" />
                    <asp:Button runat="server" ID="Btn_rating2" Text="2" CssClass="btn btn-primary" OnClick="Button_Rate_Click" />
                    <asp:Button runat="server" ID="Btn_rating3" Text="3" CssClass="btn btn-primary" OnClick="Button_Rate_Click" />
                    <asp:Button runat="server" ID="Btn_rating4" Text="4" CssClass="btn btn-primary" OnClick="Button_Rate_Click" />
                    <asp:Button runat="server" ID="Btn_rating5" Text="5" CssClass="btn btn-primary" OnClick="Button_Rate_Click" />
                </div>
                <div class="col-md-2">
                    <p class="row rating">
                        RATING: <span id="span_score"><%#: String.Format("{0:0.00}",this.rating )%></span>
                </div>
                <div class="col-md-2"></div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>

    <hr />

    <div class="row">
        <div class="col-md-6">
            <asp:UpdatePanel runat="server">
                <ContentTemplate>
                    <p>
                        <div class="row">
                            <p>
                                <asp:Label runat="server" ID="Label_commentAdded" CssClass="alert alert-success" role="alert" Visible="false" Width="600px">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true">&nbsp;</span>Comment added. Thank You!
                                </asp:Label>
                            </p>
                            <p>
                                <asp:Label runat="server" ID="Label_VoteAdded" CssClass="alert alert-success" role="alert" Visible="false" Width="600px">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true">&nbsp;</span>Thank You for your vote!
                                </asp:Label>
                            </p>
                            <p>
                                <asp:Label runat="server" ID="Label_commentEmptyError" CssClass="alert alert-danger" role="alert" Visible="false" Width="600px">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true">&nbsp;</span>Comment cannot be empty!
                                </asp:Label>
                            </p>
                        </div>
                    </p>

                    <div class="row">
                        <h2 class="mainHeadings">Comments</h2>
                    </div>

                    <p>
                        <div class="row">
                            <asp:Button runat="server" ID="Btn_addComment" Text="Add Comment" OnClick="Btn_addComment_Click" CssClass="btn btn-primary btn-lg" Visible="true" />
                        </div>
                    </p>

                    <div class="row" runat="server" id="div_add" visible="false">
                        <h3 class="mainHeadings">Add New Comment</h3>
                        <div class="container">
                            <p>
                                <div class="row">
                                    <div class="col-md-3 badge">
                                        Comment: 
                                    </div>
                                    <div class="col-md-9">
                                        <asp:TextBox runat="server"
                                            ID="textbox_comment"
                                            placeholder="Enter comment here..."
                                            MaxLength="500"
                                            TextMode="MultiLine"
                                            Rows="5"
                                            Width="400"
                                            CssClass="form-control"></asp:TextBox>
                                    </div>
                                </div>
                            </p>
                            <p>
                                <div class="row">
                                    <div class="col-md-3 badge">
                                        Your name: 
                                    </div>
                                    <div class="col-md-9">
                                        <asp:TextBox runat="server"
                                            ID="textbox_owner"
                                            placeholder="Enter you name here..."
                                            MaxLength="100"
                                            Width="400"
                                            CssClass="form-control"></asp:TextBox>
                                    </div>
                                </div>
                            </p>
                        </div>

                        <p>
                            <asp:Button runat="server" ID="Btn_Add" Text="Add" CssClass="btn btn-success btn-lg" OnClick="Btn_Add_Click" />
                            <asp:Button runat="server" ID="Btn_Cancel" Text="Cancel" CssClass="btn btn-danger btn-lg" OnClick="Btn_Cancel_Click" />
                        </p>
                    </div>

                    <hr />
                    <p class="mainHeadings">Latest comments</p>
                    <hr />
                    <div class="row">
                        <asp:ListView runat="server"
                            ID="Listview_comments"
                            ItemType="Model.Comment"
                            SelectMethod="Listview_comments_GetData">
                            <ItemTemplate>
                                <p>
                                    "<%#:Item.Text %>"
                                </p>
                                <p class="comments">
                                    by: "<i><%#: Item.Owner %></i>" created on: <%#: Item.DateCreated %>
                                </p>
                            </ItemTemplate>
                            <EmptyDataTemplate>No comments yet.</EmptyDataTemplate>
                            <ItemSeparatorTemplate>
                                <hr />
                            </ItemSeparatorTemplate>
                        </asp:ListView>
                    </div>

                </ContentTemplate>
            </asp:UpdatePanel>
        </div>

        <div class="col-md-1"></div>

        <div class="col-md-5">
            <div class="row">
                <h2 id="highScore" class="mainHeadings">High Score</h2>
            </div>
            <asp:UpdatePanel runat="server">
                <ContentTemplate>
                    <asp:GridView
                        runat="server"
                        ID="Grid_HighScore"
                        DataKeyNames="Id"
                        ItemType="Model.HighScore"
                        SelectMethod="Grid_HighScore_GetData"
                        AutoGenerateColumns="false"
                        AllowPaging="true"
                        PageSize="10"
                        CssClass="table table-hover table-striped">
                        <Columns>
                            <asp:BoundField DataField="Owner" HeaderText="Player Name" />
                            <asp:BoundField DataField="Points" HeaderText="Points" />
                        </Columns>
                    </asp:GridView>
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </div>

    <script src="Scripts/MyScripts/load_animation.js"></script>
    <script src="Scripts/MyScripts/menu.js"></script>
    <script src="Scripts/MyScripts/game.js"></script>
    <script src="Scripts/MyScripts/svgTopBar.js"></script>
    
</asp:Content>
