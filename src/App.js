import React, { useState, useMemo, useCallback } from 'react';

function App() {
	const [
		normalSnippet,
		setNormalSnippet
	] = useState(`<a href="#" class="whitespace-no-wrap ml-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
  Company
</a>`);
	const [
		activeSnippet,
		setActiveSnippet
	] = useState(`<a href="#" class="whitespace-no-wrap ml-8 py-4 px-1 border-b-2 border-indigo-500 font-medium text-sm leading-5 text-indigo-600 focus:outline-none focus:text-indigo-800 focus:border-indigo-700" aria-current="page">
  Team Members
</a>`);

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

		const commonList = active.filter(function (n) {
			return normal.indexOf(n) !== -1;
		});

		const activeList = active.filter(function (n) {
			return normal.indexOf(n) === -1;
		});

		const normalList = normal.filter(function (n) {
			return active.indexOf(n) === -1;
		});

		return {
			common: commonList,
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
				<h1 className="text-3xl text-gray-900">
					Vue.js Tailwind UI Helper{' '}
					<span className="text-lg">
						by{' '}
						<a href="https://iantrent.com/" className="text-blue-500">
							@ianmtrent
						</a>
					</span>
				</h1>
				<p className="mb-4 text-gray-900">
					<span role="img">🗄</span> Separate active, normal, and common classes for tailwindui components
				</p>
			</div>
			<p className="mb-2 text-gray-700 font-medium">Normal Element</p>
			<textarea
				className="mb-4 h-32 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				onChange={(e) => setNormalSnippet(e.target.value)}
				value={normalSnippet}
				cols="30"
				rows="10"
			></textarea>
			<p className="mb-2 text-gray-700 font-medium">Active State Element</p>
			<textarea
				className="mb-8 h-32 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				onChange={(e) => setActiveSnippet(e.target.value)}
				value={activeSnippet}
				cols="30"
				rows="10"
			></textarea>
			<div className="bg-gray-900 mb-8">
				<pre className="overflow-auto py-8 px-8">
					<code>
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
							{classObject.common.map(
								(item, i) => item + `${i + 1 !== classObject.common.length ? ' ' : ''}`
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
					<p className="mb-2 text-gray-700 font-medium">Normal State</p>
					<pre className="text-gray-900">{JSON.stringify(classObject.normal, null, '  ')}</pre>
				</div>
				<div>
					<p className="mb-2 text-gray-700 font-medium">Active State</p>
					<pre className="text-gray-900">{JSON.stringify(classObject.active, null, '  ')}</pre>
				</div>
				<div>
					<p className="mb-2 text-gray-700 font-medium">Shared Classes</p>
					<pre className="text-gray-900">{JSON.stringify(classObject.common, null, '  ')}</pre>
				</div>
			</div>
		</div>
	);
}

export default App;
