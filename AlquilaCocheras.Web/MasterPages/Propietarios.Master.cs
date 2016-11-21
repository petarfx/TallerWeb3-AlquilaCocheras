﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AlquilaCocheras.Web.MasterPages
{
    public partial class Propietarios : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["ROL"] != null && Session["ROL"].ToString() != ConfigurationManager.AppSettings["PerfilPropietario"].ToString())
                {
                    if (Session["ROL"] == ConfigurationManager.AppSettings["PerfilCliente"].ToString()) //CLIENTES
                        Response.Redirect(ConfigurationManager.AppSettings["ClienteInicio"].ToString());
                    else//ANONIMOS
                    {
                        Session["ROL"] = null;
                        Response.Redirect("../login.aspx");
                    }
                }
                //PROPIETARIO (NO HACER NADA)
            }
        }
    }
}