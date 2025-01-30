export const RatingOptionsSlime = ['Everyone', 'Everyone 10+', 'Teen', 'Mature', 'Adults Only'];
export const RatingOptionsESRB = [
	'Everyone',
	'Everyone 10+',
	'Teen',
	'Mature',
	'Adults Only 18+',
	'Rating Pending',
	'Rating Pending: Likely Mature 17+',
];
export const RatingOptionsPEGI = ['3', '7', '12', '16', '18'];
export const RatingOptionsMPAA = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
export const RatingOptionsUSK = ['0', '6', '12', '16', '18'];
export const RatingOptionsCERO = [
	'A',
	'B',
	'C',
	'D',
	'Z',
	'Educational/Database',
	'CERO Regulations-Compatible',
	'Rating Scheduled',
];
export const RatingOptionsGRAC = ['All', '12+', '15+', '18+', '19+', 'T'];
export const RatingOptionsESRA = ['+3', '+7', '+12', '+15', '+18'];
export const RatingOptionsCSRR = ['G', 'P', 'PG 12', 'PG 15', 'R'];
export const RatingOptionsACB = ['E', 'G', 'PG', 'M', 'MA 15+', 'R 18+', 'X 18+', 'RC', 'CTC'];
export const RatingOptionsBAR = ['L', 'AL', '10', 'A 10', '12', 'A 12', '14', 'A 14', '16', 'A 16', '18', ' A 18'];

export const RatingsOrgs = [
	{
		name: 'Slime',
		fullName: 'Slime Network Self-Rating Questionnaire',
		ratings: RatingOptionsSlime,
		selfClassified: true,
		contentCriteria: [
			{
				name: 'Violence',
				description: 'Level of violence and/or gore.',
				value: 0,
			},
			{
				name: 'Nudity',
				description: 'Level of nudity or nakedness.',
				value: 0,
			},
			{
				name: 'Sexual Themes',
				description: 'Level of sexual themes including innuendo, sexual humor, behavior, or explicitly sexual content.',
				value: 0,
			},
			{
				name: 'Explicit Language',
				description: 'Level of explicit language or profanity.',
				value: 0,
			},
			{
				name: 'Adult Themes',
				description:
					'Level of adult themes other than violence, nudity, or sexual content. For example - criminal activity, drug use, psychological horror, racism, etc.',
				value: 0,
			},
			{
				name: 'Microtransactions',
				description: 'Contains in-game purchases or microtransactions.',
				value: 0,
			},
			{
				name: 'Loot Boxes / Gacha',
				description:
					'Contains loot boxes, gacha, or other randomized or uncertain rewards in exchange for real-world currency, or items with monetary value.',
				value: 0,
			},
			{
				name: 'Gambling',
				description:
					'Contains explicit gambling mechanics or activities where real-world currency can be won or lost, including in-game currencies or items that can be exchanged for real-world currency.',
				value: 0,
			},
			{
				name: 'Data Collection',
				description:
					'Requires users to provide personal information or collects data on users including names, email address, location, IP address, etc.',
				value: 0,
			},
			{
				name: 'Online Interactions',
				description: 'Allows for direct online interactions with other players via chat, voice, or other means.',
				value: 0,
			},
			{
				name: 'Epilepsy Warning',
				description:
					'Contains flashing lights or patterns that may trigger seizures in people with photosensitive epilepsy.',
				value: 0,
			},
			{
				name: 'Streamer Safe',
				description:
					'Contains no content that would be considered inappropriate for streaming on platforms like Twitch or YouTube. Or contains a clearly defined option/mode that effectively disables inappropriate content.',
				value: 0,
			},
			{
				name: 'Contains AI-Generated Content',
				description: 'Contains content that was generated by an AI or machine learning algorithm.',
				value: 0,
			},
		],
	},
	{
		name: 'ESRB',
		fullName: 'Entertainment Software Rating Board',
		ratings: RatingOptionsESRB,
		selfClassified: false,
		contentCriteria: [
			{
				name: 'Alcohol Reference',
				description: 'References to alcohol in any form.',
				value: 0,
			},
			{
				name: 'Animated Blood',
				description: 'Content includes unrealistic and/or discolored blood.',
				value: 0,
			},
			{
				name: 'Blood',
				description: 'Graphics include realistic blood.',
				value: 0,
			},
			{
				name: 'Blood and Gore',
				description: 'Graphics include realistic blood and the mutilation of body parts.',
				value: 0,
			},
			{
				name: 'Cartoon Violence',
				description: 'Violent actions that look cartoon-like in nature.',
				value: 0,
			},
			{
				name: 'Comic Mischief',
				description: 'Content includes slapstick or suggestive humor.',
				value: 0,
			},
			{
				name: 'Crude Humor',
				description: 'Content includes humor that may seem vulgar.',
				value: 0,
			},
			{
				name: 'Drug Reference',
				description: 'References to illegal drugs in any form.',
				value: 0,
			},
			{
				name: 'Fantasy Violence',
				description: 'Violent actions that look unrealistic and can easily be distinguished from reality.',
				value: 0,
			},
			{
				name: 'Gambling Themes',
				description:
					'Prominently features images or activities that are typically associated with real-world gambling, even if they are not directly simulating a gambling experience.',
				value: 0,
			},
			{
				name: 'Intense Violence',
				description:
					'Graphic and realistic depictions of violence. May include weapons, human injury, blood, gore and/or death.',
				value: 0,
			},
			{
				name: 'Language',
				description: 'Mild to moderate use of profanity.',
				value: 0,
			},
			{
				name: 'Lyrics',
				description:
					'Mildly objectionable lyrics contained in the games soundtrack contain use of profanities, and/or references to sexuality, alcohol, tobacco, and/or drug use.',
				value: 0,
			},
			{
				name: 'Mature Humor',
				description: 'Content includes "adult" humor.',
				value: 0,
			},
			{
				name: 'Nudity',
				description: 'Depictions of nudity.',
				value: 0,
			},
			{
				name: 'Partial Nudity',
				description: 'Brief and/or mild depictions of nudity.',
				value: 0,
			},
			{
				name: 'Real Gambling',
				description: 'Player can gamble with real-life currency.',
				value: 0,
			},
			{
				name: 'Sexual Content',
				description: 'Depictions of sexual behavior.',
				value: 0,
			},
			{
				name: 'Sexual Themes',
				description: 'References to sex and/or sexuality.',
				value: 0,
			},
			{
				name: 'Sexual Violence',
				description: 'Includes violent, sexual acts including rape.',
				value: 0,
			},
			{
				name: 'Simulated Gambling',
				description: 'Contains gameplay that simulates gambling activities without using real-life currency.',
				value: 0,
			},
			{
				name: 'Strong Language',
				description: 'Explicit/frequent use of profanity.',
				value: 0,
			},
			{
				name: 'Strong Lyrics',
				description:
					'Lyrics contained in the games soundtrack contain explicit/frequent use of profanities and/or references to sexuality.',
				value: 0,
			},
			{
				name: 'Strong Sexual Content',
				description: 'Explicit and/or frequent sexual behavior.',
				value: 0,
			},
			{
				name: 'Suggestive Themes',
				description: 'Mild references to sex and/or sexuality.',
				value: 0,
			},
			{
				name: 'Tobacco Reference',
				description: 'References to tobacco products in any form.',
				value: 0,
			},
			{
				name: 'Use of Drugs',
				description: 'Depictions of the use of real illegal drugs.',
				value: 0,
			},
			{
				name: 'Use of Alcohol',
				description: 'Depictions of alcohol consumption.',
				value: 0,
			},
			{
				name: 'Use of Tobacco',
				description: 'Depictions of the use of tobacco products.',
				value: 0,
			},
			{
				name: 'Violent References',
				description: 'References to violent acts.',
				value: 0,
			},
			{
				name: 'Violence',
				description:
					'Content includes aggressive behavior against an individual, community, self, or other real or fictional animals.',
				value: 0,
			},
		],
	},
	{
		name: 'PEGI',
		fullName: 'Pan-European Game Information',
		ratings: RatingOptionsPEGI,
		selfClassified: false,
		contentCriteria: [
			{
				name: 'Bad Language',
				description:
					'The game contains bad language. This descriptor can be found on games with a PEGI 12 (mild swearing), PEGI 16 (e.g. sexual expletives or blasphemy) or PEGI 18 rating (e.g. sexual expletives or blasphemy).',
				value: 0,
			},
			{
				name: 'Discrimination',
				description:
					'The game contains depictions of ethnic, religious, nationalistic or other stereotypes deemed likely to encourage hatred. This content is always restricted to a PEGI 18 rating (and may infringe national criminal laws). As of 2025, only five titles have this descriptor: two expansions for Postal 2 – Share the Pain (2004) and Apocalypse Weekend (classified 2005); Original War (classified 2004); Patriots: A Nation Under Fire (2006); and SWAT: Target Liberty (2007).',
				value: 0,
			},
			{
				name: 'Drugs',
				description:
					'The game refers to or depicts the use of illegal drugs, narcotics, alcohol or tobacco. Games with this content descriptor are rated either PEGI 16 or PEGI 18.',
				value: 0,
			},
			{
				name: 'Fear/Horror',
				description:
					'The Fear descriptor may appear on games with a PEGI 7 if they contain pictures or sounds that may be frightening or scary to young children. The Horror descriptor may appear on PEGI 12 or PEGI 16 games with horror sound effects or images, but not necessarily any violent content. Although PEGIs official website states that only games rated PEGI 7 may carry the Fear descriptor as of 2024, it also lists three titles previously rated PEGI 12 – Road to India (classified 2007), Ultima VII Complete (classified 2013) and the hidden object game collection Grim Tales: Die Gray Familien-Saga (2017) – as well as the PEGI 16 title ABE VR (2016)[6] as displaying the Fear descriptor instead of Horror.',
				value: 0,
			},
			{
				name: 'Gambling',
				description:
					'The game contains elements that encourage or teach gambling. These simulations of gambling refer to games of chance that are normally carried out in casinos or gambling halls. Games with this sort of content could previously be classified at PEGI 12 or PEGI 16. As of 2020, all new games with such content, whether or not real-life currency is directly involved, are rated PEGI 18, although older games retain their existing classifications.',
				value: 0,
			},
			{
				name: 'Sex',
				description:
					'This content descriptor can accompany a PEGI 12 rating if the game includes sexual posturing or innuendo, a PEGI 16 rating if there is erotic nudity or sexual intercourse without visible genitals, or a PEGI 18 rating if there is explicit sexual activity in the game. Depictions of nudity in a non-sexual context do not require a specific age rating, and this descriptor would not be necessary.',
				value: 0,
			},
			{
				name: 'Violence',
				description:
					'The game contains depictions of violence. In games rated PEGI 7 this can only be non-realistic or non-detailed violence. Games rated PEGI 12 can include violence in a fantasy environment or non-realistic violence towards human-like characters, whereas games rated PEGI 16 or 18 have increasingly more realistic-looking violence.',
				value: 0,
			},
			{
				name: 'Online',
				description: 'May contain online interactions.',
				value: 0,
			},
			{
				name: 'In-Game Purchases',
				description:
					'The game presents players with the options to purchase digital goods or services with real-world currency. These purchases include but are not limited to bonus levels, skins, surprise items, music, virtual coins and other forms of in-game currency, subscriptions, season passes and upgrades (e.g. to disable ads). This descriptor may be accompanied by an additional notice that the game includes random items such as loot boxes.',
				value: 0,
			},
		],
	},
	{
		name: 'MPAA',
		fullName: 'Motion Picture Association of America',
		ratings: RatingOptionsMPAA,
		selfClassified: false,
	},
	{
		name: 'USK',
		fullName: 'Unterhaltungssoftware Selbstkontrolle',
		ratings: RatingOptionsUSK,
		selfClassified: false,
		contentCriteria: [
			{
				name: 'Alcohol',
				description: 'The consumption of alcohol is portrayed positively or frequently.',
				value: 0,
			},
			{
				name: 'Tobacco use',
				description: 'The use of tobacco is portrayed positively or frequently.',
				value: 0,
			},
			{
				name: 'Drugs',
				description: 'The use of drugs is portrayed positively or frequently.',
				value: 0,
			},
			{
				name: 'Occasional swearing',
				description: 'The game contains profanity.',
				value: 0,
			},
			{
				name: '	Explicit language',
				description: 'The game contains profanity considered particularly harsh or vulgar.',
				value: 0,
			},
			{
				name: 'Implied violence',
				description:
					'Violence is depicted in an abstract and unrealistic manner, with no visible physical contact between characters. No damage or injuries are visible when a character is hit.',
				value: 0,
			},
			{
				name: 'Comic violence',
				description:
					'The game depicts cartoon violence in an unrealistic setting, characterized by unrealistic weapons, exaggerated effects and the disappearance of enemies upon defeat.',
				value: 0,
			},
			{
				name: 'Fantasy violence',
				description:
					'Violence is depicted in a fantastical or futuristic setting that is clearly distinguishable from reality.',
				value: 0,
			},
			{
				name: 'Violence',
				description: 'Violence may appear realistic or is the main theme of the game.',
				value: 0,
			},
			{
				name: 'Explicit violence',
				description: 'The game features violence that is "clearly visualized or overly focused".',
				value: 0,
			},
			{
				name: '	Sexual innuendo',
				description: 'The game contains sexually suggestive content.',
				value: 0,
			},
			{
				name: '	Sexual content',
				description: 'Sex is the main theme of the game, or explicit sexual acts are depicted or alluded to.',
				value: 0,
			},
			{
				name: 'Sexualised violence',
				description: 'Sexual violence is clearly depicted.',
				value: 0,
			},
			{
				name: 'Burdensome themes',
				description: 'The game deals with emotionally stressful themes such as death, bullying and addiction.',
				value: 0,
			},
			{
				name: 'Dark atmosphere',
				description: 'The game features a dark environment which may frighten some players.',
				value: 0,
			},
			{
				name: 'Scary moments',
				description: 'Elements featured in the game may frighten some players.',
				value: 0,
			},
			{
				name: 'Horror',
				description: 'The game features horror themes and effects.',
				value: 0,
			},
			{
				name: 'War themes',
				description: 'The game is set during wartime, and violence is thus an integral part of gameplay.',
				value: 0,
			},
			{
				name: '	Gambling themes',
				description:
					'The game contains gambling elements that may promote a positive attitude towards real-life gambling.',
				value: 0,
			},
			{
				name: 'Problematic advertising content',
				description:
					'The game contains advertising considered "more relevant to the protection of minors" than the game itself.',
				value: 0,
			},
			{
				name: 'Pressure to play excessively',
				description:
					'The game encourages the player to play frequently and/or for an extended period of time, such as via push notifications, season passes, gifts for returning, and penalizing the player for inactivity.',
				value: 0,
			},
			{
				name: 'Increased incentives to buy',
				description:
					'The game puts increased pressure on the player to make microtransactions, such as via multiple virtual currencies, pay-to-win mechanics, and notifying the player of the imminent expiration of limited time offers.',
				value: 0,
			},
			{
				name: 'Pressure to act',
				description:
					'The game puts direct or indirect pressure on the player to take action via stressful situations such as time limits, boss battles, a high number of opponents, rewards for playing frequently, or limited time offers.',
				value: 0,
			},
			{
				name: 'Increased communications risks',
				description:
					'The game contains unmoderated chat or does not allow players to block or report one another, which may result in "unwanted, inappropriate or offensive communication."',
				value: 0,
			},
			{
				name: '	Contact risks',
				description:
					'The game allows players to display personal information such as real names and locations, which may create the risk of unsecure contact.',
				value: 0,
			},
		],
	},
	{
		name: 'CERO',
		fullName: 'Computer Entertainment Rating Organization',
		ratings: RatingOptionsCERO,
		selfClassified: false,
		contentCriteria: [
			{
				name: 'Love',
				description:
					'Contains expressions of romance or love. (Possibly includes kissing, hugging, dating, and other expressions of romantic desire or relations.)',
				value: 0,
			},
			{
				name: 'Sexual Content',
				description:
					'Contains expressions of sexual relations and/or sexual activity. (Possibly includes swimwear or suggestive outfits, exposure of underwear, partial nudity, suggestive behavior, immoral thoughts, prostitution, sexual contact and/or activities, and other sexual content.)',
				value: 0,
			},
			{
				name: 'Violence',
				description:
					'Contains violent activity. (Possibly includes fighting, bodily harm and wounding, killing, dismemberment, depiction of corpses, blood and gore, and other violent content.)',
				value: 0,
			},
			{
				name: 'Horror',
				description:
					'Contains frightful or horror elements. (Possibly includes traditional horror characters such as ghosts, zombies, vampires, or other elements of the occult, as well as moments designed to frighten. Usually used to designate games that may scare children, the Horror icon might not be found on frightening games outside of lower age ratings, even in games that fall into the horror genre.)',
				value: 0,
			},
			{
				name: 'Drinking/Smoking',
				description:
					'Contains depictions or references to the consumption of alcohol and/or cigarette or cigar smoking.',
				value: 0,
			},
			{
				name: 'Gambling',
				description: 'Contains illegal gambling activities, either by depiction or in interactive form.',
				value: 0,
			},
			{
				name: 'Crime',
				description:
					'Contains criminal activity, either by depiction or in interactive form. (Possibly includes illegal activity, dangerous and unlawful behavior, abusive behavior, rape, organized crime, and other criminal acts.)',
				value: 0,
			},
			{
				name: 'Drugs',
				description: 'Contains depictions or references to the use of drugs and illegal narcotics.',
				value: 0,
			},
			{ name: 'Language', description: 'Contains profane, derogatory, or bigoted language.', contains: false },
		],
	},
	{
		name: 'GRAC',
		fullName: 'Game Rating and Administration Committee',
		url: 'https://www.grac.or.kr/',
		ratings: RatingOptionsGRAC,
		selfClassified: false,
		contentCriteria: [
			{
				name: 'Sexuality',
				description: 'Contains references or explicit depictions of sexual behavior, possibly including nudity.',
				value: 0,
			},
			{
				name: 'Violence',
				description:
					'Contains references or scenes involving aggressive conflict, may contain blood scenes (realistic blood, gore, weapons, and depictions of human injury and death)/PvP or PK.',
				value: 0,
			},
			{
				name: 'Fear, Horror, Threatening',
				description: 'Contains references or depictions of horrifying action.',
				value: 0,
			},
			{
				name: 'Language',
				description:
					'Contains references or explicit depictions of inappropriate language. (sexual, problematic social messages, abusive language, etc.)',
				value: 0,
			},
			{
				name: 'Alcohol, Tobacco, Drug',
				description: 'Contains references or images of alcoholic beverages, tobacco products, and/or illegal drug use.',
				value: 0,
			},
			{
				name: '	Crime, Anti-societal',
				description: 'Contains references or images of crime, anti-societal, and/or anti-governmental messages.',
				value: 0,
			},
			{
				name: 'Gambling',
				description: 'Contains references to gambling or betting (speculation), and/or simulated gambling.',
				value: 0,
			},
		],
	},
	{
		name: 'ESRA',
		fullName: 'Entertainment Software Rating Association',
		ratings: RatingOptionsESRA,
		selfClassified: false,
	},
	{
		name: 'CSRR',
		fullName: 'Game Software Rating Regulations',
		ratings: RatingOptionsCSRR,
		selfClassified: false,
	},
	{
		name: 'ACB',
		fullName: 'Australian Classification Board',
		ratings: RatingOptionsACB,
		selfClassified: false,
	},
	{
		name: 'BAR',
		fullName: 'Brazilian Advisory Rating',
		ratings: RatingOptionsBAR,
		selfClassified: false,
		contentCriteria: [
			{
				name: 'Violence',
				description:
					'L - Fantasy violence; display of guns with no violence; very mild swear words; deaths with no violence; slapping; bones and skeletons with no violence.\n10 - Display of guns with violence; fear or tension; distress; bones and skeletons with signs of violent acts; criminal acts without violence; derogatory language; mild swear words.,\n12 - Violent act; body injury; violence references; sight of blood; victims pain; natural or accidental death with violence; violent act against animals; exposure to danger; showing people in embarrassing or degrading situations; verbal aggression; obscenity; bullying; corpses; sexual harassment; overvaluation of the physical beauty; overvaluation of consumption \n14 - Abortion; Euthanasia; Sexual exploitation; Intentional death; Death penalty; Social stigma or Prejudice.\n16 - Rape; Mutilation; Sexual abuse; Suicide; Sexual violence; Torture; Gratuitous violence/trivialization of violence.\n18 - Apology to violence; Pedophilia; Extreme Violence; Cruelty.',
				value: 0,
			},
			{
				name: 'Sexual Content',
				description:
					'L - Non-erotic nudity; farting.\n10 - Educational contents about sex; Tongue kiss.\n12 - Veiled nudity; sexual innuendo; sexual fondling; genitals; masturbation; coarse language; sex references; sex simulation; sexual appeal.\n14 - Erotization; Moderate Nudity; Crude language; Sexual intercourse; Prostitution.\n16 - Intense sexual intercourse; strong sexual content; Total nudity.\n18 - Explicit sex; Complex/strong impact sexual situation; violent fetishes; pornography.',
				value: 0,
			},
			{
				name: 'Drugs',
				description:
					'L - Moderate or suggestive use of legal drugs.\n10 - References to the use of legal drugs; discussion on the issue "drug trafficking"; medicinal use of illegal drugs.\n12 - Use of legal drugs; Medication misuse; Inducing the use of legal drugs; Discussion on the "decriminalization of illegal drugs"; Illegal drugs references.\n14 - Suggestive use of illegal drugs; References to the use or trafficking of illegal drugs\n 16 - Production or trafficking of any illegal drug; Use of illegal drugs; Inducing the use of illegal drugs; Cannabis.\n18 - Apology to the use of illegal drugs.',
				value: 0,
			},
		],
	},
];
