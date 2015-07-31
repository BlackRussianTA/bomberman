<%@ Page Title="Contact" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Contact.aspx.cs" Inherits="UI.Contact" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <style>
        @font-face {
            font-family: iceCream;
            src: url('fonts/IceCream.eot');
            src: url('fonts/IceCream.eot?#iefix') format('embedded-opentype'), url('fonts/IceCream.woff2') format('woff2'), url('fonts/IceCream.woff') format('woff'), url('fonts/IceCream.ttf') format('truetype');
        }

        a {
            font-family: iceCream;
        }
    </style>
    <h2><%: Title %>.</h2>
    <h3><a href="https://github.com/IvoPaunov">IvoPaunov</a></h3>
    <h3><a href="https://github.com/V3ronique">V3ronique</a></h3>
    <h3><a href="https://github.com/ChrisChrisi">ChrisChrisi</a></h3>
    <h3><a href="https://github.com/antoanelenkov">antoanelenkov</a></h3>
    <br />
    <address>
        Telerik Academy<br />
    </address>
</asp:Content>
