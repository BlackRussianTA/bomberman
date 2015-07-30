<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="About.aspx.cs" Inherits="UI.About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <link href="Content/presentation.css" rel="stylesheet" />

    <div id="impress">
        <div id='title' class='step' data-x='-6500' data-y='100' data-scale='1' data-z="7000">
            <h1>Black Russian Team
            </h1>
            <p>presents</p>
        </div>

        <div id='bomberman' class="step" data-x='-6500' data-y='3500' data-scale='1' data-z='7000' data-rotate='180'>
            <h2>HEAT REVENGE</h2>
        </div>

        <div class='step' id='story-1' data-x='1200' data-y='1200' data-scale='4' data-rotate='90' data-z='3000'>
            <p>
                It is a strategic, maze-based video game originally developed by Hudson Software and published in 1983.
            </p>
        </div>

        <div class='step' id='story-2' data-x='1200' data-y='1200' data-scale='1' data-z='1000' data-rotate='270'>
            <p>
                ... and published at irregular intervals ever since
            </p>
        </div>

        <div class='step' id='gameplay-1' data-x='6000' data-y="0" data-scale='1' data-z='-2000'>
            <p>
                To complete the levels you should strategically place bombs in order to kill enemies and destroy obstacles.
            </p>
        </div>

        <div class='step' id='gameplay-2' data-x='6000' data-y="0" data-scale='1' data-z='-4000'>
            <p>
                However bombs can also kill the player.
            </p>
        </div>

        <div class='step' id='created' data-x='6000' data-y="0" data-scale='1' data-z='-9000'>
            <span>Created by:</span>
            <ul>
                <li>ivo.paunov</li>
                <li>Kmileva</li>
                <li>antoanelenkov</li>
                <li>Nicca</li>
            </ul>
            <button>Back</button>
        </div>
    </div>

    <script src="Scripts/impress.js"></script>
    <script>impress().init();</script>
</asp:Content>
