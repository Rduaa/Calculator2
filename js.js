let script = "";

const doc = Object.freeze({
	get body()
	{
		return document.body;
	},
	get head()
	{
		return document.head;
	},
	
	class: c => document.getElementsByClassName(c),
	id: i => document.getElementById(i),
	tag: t => document.getElementsByTagName(t)
});

const calc = (s) => eval(s.split("x").join("*").split("÷").join("/"));

const Press = (btn) =>
{
	let display, preresult;
	
	if (!btn.classList.contains("pressed"))
	{
		btn.classList.add("pressed");
		
		switch (btn.innerHTML)
		{
			case "AC":
				script = "";
				display = "";
				break;
			
			case "C":
				script = script.split("");
				script.pop();
				script = script.join("");
				display = script;
				break;
			
			case "=":
				if (script == "")
				{
					display = "";
				} else {
					try
					{
						display = calc(script);
					} catch {
						display = "?";
					}
				}
				preresult = "";
				script = "";
				break;
			
			default:
				script += btn.innerHTML;
				display = script;
				break;
		}
		
		if (script == "")
		{
			preresult = "";
		} else {
			try
			{
				preresult = calc(script);
			} catch {
				preresult = "?";
			}
		}
		
		doc.class("display")[0].innerHTML = display;
		doc.class("preresult")[0].innerHTML = preresult;
	}
};

const unPress = (btn) =>
{
	if (btn.classList.contains("pressed"))
	{
		btn.classList.remove("pressed");
	}
};

onload = () =>
{
	const buttons = doc.tag("button");
	
	for (let i = 0; i < buttons.length; ++i)
	{
		const button = buttons[i];
		
		button
		.addEventListener("touchstart",
		() => Press(button));
		
		button
		.addEventListener("touchend",
		() => unPress(button));
		
		
		/*button
		.addEventListener("mousedown",
		() => Press(button));
		
		button
		.addEventListener("mouseup",
		() => unPress(button));*/
	}
};