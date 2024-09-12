Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

function preventIdiot(event) {
	var hint = $("span[data-test='hint-sentence']").text();
	var romajiHint = wanakana.toRomaji(hint);
	var answer = $("div[data-test*='challenge-translate'] textarea[lang='en']");
	var value = answer.val();
	if(value === romajiHint) {
		answer.val("");
		$("h1[data-test='challenge-header']").append("<span>, you fucking idiot</span>");
		event.preventDefault();
		event.stopPropagation();
	}
}

function applyLanguageColors() {
	$("div[data-test*='challenge-translate']").has("textarea[lang='en']").addClass("translateToEnglish");
	$("div[data-test*='challenge-translate']").has("textarea[lang='ja']").addClass("translateToJapanese");
	$("div[data-test*='challenge-listenTap']").has("textarea[lang='ja']").addClass("translateToJapanese");
}

function applyWanakana() {
	$("textarea[lang='ja']").not(".wanakana").each(function() {
		$(this).addClass("wanakana");
		wanakana.bind($(this).get(0));
	});
}

function applyIdiotPrevention() {
	$("div[data-test*='challenge-translate']").has("textarea[lang='en']").keydown(function(event) {
		if (event.which === 13) {
			preventIdiot(event);
		}
	});
}

function applyBetterCharacterMatch() {
	/*$("button._2NJbh._2ygjK._2HKPs._1gz3r").each(function() {
		$(this).remove();
		$(".tapTokenButton").removeClass("tapTokenButton");
		$(".tapTokenMainButton").removeClass("tapTokenMainButton");
		$("span.tapTokenNumber").remove();
	});*/
	
	/*var mainTapButton = $("div[data-test*='challenge-characterMatch'] button[data-test='challenge-tap-token']").first();
	if (!mainTapButton.hasClass("_1VtkU")) {
		$("h1[data-test='challenge-header'] + div").prepend(mainTapButton);
		mainTapButton.click();
		mainTapButton.addClass("tapTokenMainButton");
	}
	
	$("div[data-test*='challenge-characterMatch'] button[data-test='challenge-tap-token']").not(":has(span.tapTokenNumber)").each(function(index) {
		if (index > 0) {
			$(this).append('<span class="tapTokenNumber">' + index + '</span>')
		}
		$(this).addClass("tapTokenButton");
	});*/
}

function onPageUpdate() {
	applyLanguageColors();
	applyWanakana();
	applyIdiotPrevention();
	applyBetterCharacterMatch();
}

/*$(document).keydown(function(event) {
	if (Number.isInteger(parseInt(event.key))) {
		$("div[data-test*='challenge-characterMatch'] button[data-test='challenge-tap-token']").eq(event.key).click();
	}
});*/

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var applying = false;
var updates = 0;
var observer = new MutationObserver(function(mutations, observer) {
	if (applying || updates > 10) {
		return;
	}
	
    applying = true;
	onPageUpdate();
	updates++;
	applying = false;
});

observer.observe(document, {
  subtree: true,
  attributes: true,
  childList: true
});

setInterval(function() {
	updates = 0;
}, 1000);

console.log("Duolingo but good Plugin is loaded");