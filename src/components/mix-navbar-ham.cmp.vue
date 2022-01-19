<template>
  <vue-navigation-bar :options="navbarOptions" />
</template>
 
<script>
  export default {
      data() {
        return {
          navbarOptions: {
            elementId: "main-navbar",
            isUsingVueRouter: true,
            mobileBreakpoint: 992,
            // brandImagePath: "https://res.cloudinary.com/hw-projects/image/upload/v1607170035/appmixes/",
            // brandImage: require("logo_r_animated_v3_first_Frame_160x105.jpg"),
            brandImageAltText: "brand-image",
            collapseButtonOpenColor: "#661c23",
            collapseButtonCloseColor: "#661c23",
            showBrandImageInMobilePopup: true,
            ariaLabelMainNav: "Main Navigation",
            tooltipAnimationType: "shift-away",
            tooltipPlacement: "bottom",
            menuOptionsLeft: [
      
              {
                type: "button",
                text: "Mixes",
                path: "/mix/list",
                class: "mix-link",
              },
              {
                type: "button",
                text: "Create mix",
                class: "mix-link",
                path: "/mix/details",
              }
            ],
            menuOptionsRight: [
            
            ]
          }
        }
      },
      methods: {
        createMix(){
            this.$store.commit({
              type: "setMix",
              mix:null,
            }); 
        },
      },

  }
</script>
 
<style lang="scss">
  .vnb {
    background:transparent  !important;
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .mix-link{
    background:transparent  !important;
    color:#fff;
    }
    &:hover{
      color:#bd1725;
    }
    .button-red {
      background: #ff3b30;
 
      &:hover {
        background: darken(#ff3b30, 10%);
      }
    }
  }

  .vnb__popup {
    //  background:transparent  !important;
    position: absolute;
    left: 10px;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    perspective: 2000px;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    z-index: 100000;
    border-radius: 10px;

 .mix-link{
    background:transparent  !important;
    color: #000;
    font-weight: 900;
    min-width: 150px;
    padding: 20px 4px 0 14px;
  }
}

// .vnb__popup__top {
//     padding: 15px 24px 0;
//     border-top: 1px solid #e0e0e0;
//     border-left: 1px solid #e0e0e0;
//     border-right: 1px solid #e0e0e0;
//     border-top-right-radius: 6px;
//     border-top-left-radius: 6px;
// }

// .vnb__popup__bottom {
//      background:transparent  !important;
//     padding: 10px 0 10px;
//     border-left: none !important;
//     border-right: none !important;
//     border-bottom: none !important;
//     border-bottom-right-radius: 6px;
//     border-bottom-left-radius: 6px;
// }
</style>