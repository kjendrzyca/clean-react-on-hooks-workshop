aaaaaaaaaa

- trzebaby napisać test/przykładzik i np. hinty w komentarzu nad testem: here are things you might wanna know (e.g. context + setState functional update)
- proste rzeczy (po prostu syntax):
  - [COMPLETE] counter
  - [COMPLETE] counter with synchronous sideEffect (like storing in local storage)
  - [COMPLETE] counter with asynchronous sideEffect (api persistence)
  - [COMPLETE] [dla chętnych: przepisz counter with side effects żeby używał useReducer]
  - [COMPLETE] useContext - 'contexted' counters - przekazujesz przez kontekst funkcję, która ma zmieniać stan
    - dwie pieczenie przy jednym ogniu
      - jak używać contextów
      - że do setState z hooka możesz przekazać funkcję (w sumie to nie musisz, tho)
- trudniejsze rzeczy (use cases)
  - useReducer + useContext jako sposób na przepychanie stanu i callbacka przez głębokie drzewa
    - pokazane w teście context-aware-counter
    - chyba że potrzebne jeszcze info że dispatch i stan w osobnych kontekstach trzeba przepychać
      "??"
  - [COMPLETE] useEffect cleanup - avoiding old fetches (mamy useEffect, który strzela do api, ale jeśli stan się zmieni, a ten strzał do api jeszcze się nie skończył to stan z poprzedniego nam wskoczy na chwilę zanim wynik nowego hooka wskoczy, więc na effect cleanup ustawiasz 'boola', który sprawdza czy powinieneś zrobić setState, czy nie)
  - [COMPLETE] useRef - miejsce, w którym można przechowywać mutable state
    - timer - zmienia się co sekundę, ale "stop" / "reset" zrobisz tylko jeśli zapiszesz intervalId w refie, bo nie ma innego sposobu na użycie "obecnego" intervalId
    - dodatkowo: ćwiczy useEffect cleanup
  - preventing child re-render with useMemo (Parent props, only re-render if specific props change, not rerender when everything changes) - meh
  - lazy setState => create expensive object once ???
  - callback ref - measuring dom node
    "to bardziej do pisania libek chyba"
    - measure h1 height, change font size -> measure should change
- czego się ludzie dowiadują:
  - syntax useState
    - zwykły `set`
    - i functional `set`
  - useEffect
    - synchronicznie i asynchronicznie
    - przynajmniej unaocznia się potrzeba czyszczenia hooków
  - useContext
  - useReducer
  - useRef - mutable state (jak property w klasie, ble)
