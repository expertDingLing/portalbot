

$('.sidebar-wrapper .nav .nav-item').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
})

$('#exchange_selector').on('change', function() {
    if (this.value == "Bitmex") {
        $('#logo_bitmex').show();
        $('#logo_binance').hide();
        $('#logo_testnet').hide();
    }
    if (this.value == "Binance") {
        $('#logo_bitmex').hide();
        $('#logo_binance').show();
        $('#logo_testnet').hide();
    }
    if (this.value == "Testnet") {
        $('#logo_bitmex').hide();
        $('#logo_binance').hide();
        $('#logo_testnet').show();
    }
  });
  