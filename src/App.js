import React, { useState, useMemo, useCallback, useRef } from 'react';

function copyToClipBoard(elemText) {
	const fakeTextarea = document.createElement('input');
	document.body.appendChild(fakeTextarea);
	fakeTextarea.setAttribute('value', elemText);
	fakeTextarea.select();
	document.execCommand('copy');
	document.body.removeChild(fakeTextarea);
}

function App() {
	const [normalSnippet, setNormalSnippet] = useState(
		`<a href="#" class="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:bg-gray-100">Company</a>`
	);
	const [activeSnippet, setActiveSnippet] = useState(
		`<a href="#" class="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:bg-gray-200" aria-current="page">Team Members</a>`
	);

	const codeEl = useRef(null);

	const computeClasses = useCallback((normalSnippet, activeSnippet) => {
		let regex = 'class="(.*?)"';

		// Match everything in between class=" and "
		// If it cant match anything, set an empty array
		let normal = normalSnippet.match(regex) || [];
		let active = activeSnippet.match(regex) || [];

		// The regex will return two items in the array.
		// If there is an item in index of 1, split it by the
		// space to create the array of class names
		if (normal[1]) normal = normal[1].split(' ');
		if (active[1]) active = active[1].split(' ');

		const sharedList = active.filter(function (n) {
			return normal.indexOf(n) !== -1;
		});

		const activeList = active.filter(function (n) {
			return normal.indexOf(n) === -1;
		});

		const normalList = normal.filter(function (n) {
			return active.indexOf(n) === -1;
		});

		return {
			shared: sharedList,
			active: activeList,
			normal: normalList
		};
	}, []);

	const classObject = useMemo(() => computeClasses(normalSnippet, activeSnippet), [
		computeClasses,
		normalSnippet,
		activeSnippet
	]);

	return (
		<div className="max-w-5xl mx-auto my-8 px-8">
			<div className="mb-8">
				<h1 className="text-2xl lg:text-3xl text-gray-900">Vue.js Tailwind UI Helper </h1>
				<p className="mb-8 text-lg">
					by{' '}
					<a href="https://iantrent.com/" className="text-blue-500">
						@ianmtrent
					</a>
				</p>
				<p className="mb-4 text-gray-900">
					<span role="img">🗄</span> Separate normal, active, and shared classes for Tailwind UI components.
				</p>
			</div>
			<label htmlFor="normal" className="block mb-2 text-gray-700 font-medium">
				Normal Element
			</label>
			<textarea
				className="mb-4 h-32 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				onChange={(e) => setNormalSnippet(e.target.value)}
				value={normalSnippet}
				id="normal"
				name="normal"
			></textarea>
			<label htmlFor="active" className="block mb-2 text-gray-700 font-medium">
				Active Element
			</label>
			<textarea
				className="mb-8 h-32 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				onChange={(e) => setActiveSnippet(e.target.value)}
				value={activeSnippet}
				id="active"
				name="active"
			></textarea>
			<div className="relative bg-gray-900 mb-8">
				<div
					className="absolute top-0 right-0 rounded-b-sm px-3 py-1 text-sm bg-gray-700 text-white cursor-pointer hover:bg-gray-600 transition ease-linear duration-200"
					onClick={() => copyToClipBoard(codeEl.current.innerText)}
				>
					Copy
				</div>
				<pre className="overflow-auto py-8 mx-8">
					<code ref={codeEl}>
						<span className="text-blue-400">:</span>
						<span className="text-purple-400">class</span>
						<span className="text-blue-400">="</span>
						<span className="text-yellow-400">[</span>
						<span className="text-gray-100">isActive</span> <span className="text-blue-400">?</span>{' '}
						<span className="text-blue-400">'</span>
						<span className="text-gray-100">
							{classObject.active.map(
								(item, i) => item + `${i + 1 !== classObject.active.length ? ' ' : ''}`
							)}
							<span className="text-blue-400">'</span>
						</span>{' '}
						<span className="text-blue-400">: '</span>
						<span className="text-gray-100">
							{classObject.normal.map(
								(item, i) => item + `${i + 1 !== classObject.normal.length ? ' ' : ''}`
							)}
						</span>
						<span className="text-blue-400">', '</span>
						<span className="text-gray-100">
							{classObject.shared.map(
								(item, i) => item + `${i + 1 !== classObject.shared.length ? ' ' : ''}`
							)}
						</span>
						<span className="text-blue-400">'</span>
						<span className="text-yellow-400">]</span>
						<span className="text-blue-400">"</span>
					</code>
				</pre>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div>
					<p className="mb-2 text-gray-700 font-medium">Normal Classes</p>
					<pre className="text-gray-900">{JSON.stringify(classObject.normal, null, '  ')}</pre>
				</div>
				<div>
					<p className="mb-2 text-gray-700 font-medium">Active Classes</p>
					<pre className="text-gray-900">{JSON.stringify(classObject.active, null, '  ')}</pre>
				</div>
				<div>
					<p className="mb-2 text-gray-700 font-medium">Shared Classes</p>
					<pre className="text-gray-900">{JSON.stringify(classObject.shared, null, '  ')}</pre>
				</div>
			</div>
		</div>
	);
}

export default App;
